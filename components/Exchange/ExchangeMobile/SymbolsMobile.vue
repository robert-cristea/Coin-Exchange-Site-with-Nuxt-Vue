<template>
    <div class="mobile-symbols-container">
        <a-row>
            <a-col :span="24">
                <SymbolsListMobile />
            </a-col>
        </a-row>
    </div>
</template>


<script>
    import SymbolsListMobile from "~/components/Exchange/ExchangeMobile/SymbolsListMobile"
    export default {
        components: {
            SymbolsListMobile
        }
    }
</script>


<style scoped>
.mobile-symbols-container {
    background: #0C121E;
    color: #9199A3;
    font-family: 'Roboto-Regular';
}
</style>