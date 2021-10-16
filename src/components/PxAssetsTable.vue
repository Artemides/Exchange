<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{up: this.sortOrder === 1, down :this.sortOrder === -1}">
          <span
            class="underline cursor-pointer"
            @click="changeSortOrder"

          >Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input 
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block"
            id="filter"
            placeholder="Buscar..."
            v-model="filter"
          type="text"/>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="e in filteredAssets"
        :key="e.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            class="w-6 h-6"
            :src="
              `https://static.coincap.io/assets/icons/${e.symbol.toLowerCase()}@2x.png`
            "
            :alt="e.name"
          />
        </td>
        <td>
          <b>#{{ e.rank }}</b>
        </td>
        <td class="hover:underline text-green-600">
            
            <router-link :to="{name:'coin-detail',params:{id: e.id}}"> {{ e.name }}</router-link>
            <small class="ml-1 text-gray-500">{{e.symbol}}</small>
           </td>
        <td>{{ e.priceUsd | dollar }}</td>
        <td>{{ e.marketCapUsd | dollar }}</td>
        <td :class="e.changePercent24Hr.includes('-') ? 'text-red-600': 'text-green-600' ">
            {{ e.changePercent24Hr | percent }}
            </td>
        <td class="hidden sm:block">
          <px-button
          @click="goToCoin(e.id)"
          >
            <span>Detalles</span>  
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import PxButton from '@/components/PxButton'
export default {
  name: "PxAssetsTable",
  data(){
    return{
      filter: '',
      sortOrder: 1
    }
  },
  computed:{
    filteredAssets(){

      const altOrder= this.sortOrder === 1 ? -1 : 1
      
      return this.assets.filter(e=> 
        e.symbol.toLowerCase().includes(this.filter.toLowerCase())||
        e.name.toLowerCase().includes(this.filter.toLowerCase())
      ).sort((a,b)=>{
        if(parseInt(a.rank)>parseInt(b.rank)){
          return this.sortOrder
        }
        return altOrder
      })
    }
  },
  components: {
    PxButton
  },
  props: {
    assets: Array,
    default: () => [],
    
  },
  methods: {
    goToCoin(id){
      this.$router.push({name: "coin-detail",params: {id}})
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1: 1
    }
  }
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
