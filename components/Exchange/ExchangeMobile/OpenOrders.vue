<template>
  <div>
    <div class="exchange-table exchange-table-sm">
      <div class="exchange-table__head">
        <div class="exchange-table__head-item">Çift2</div>
        <div class="exchange-table__head-item">Fiyat</div>
        <div class="exchange-table__head-item">Değişim</div>
      </div>
      <div class="table-overlay">
        <table>
          <tbody>
            <tr v-for="x in 10" :key="x">
              <td>ADA/BTC</td>
              <td>0.0003644</td>
              <td class="text-success">%-3.84</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
