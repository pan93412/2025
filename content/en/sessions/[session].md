<script setup lang="ts">
import {useData} from 'vitepress'
import Page from './SessionsPageEn.vue'
import { computed, watch } from 'vue';

const { params } = useData();
const session = computed(() => {
    return params.value?.session;
})
</script>

<Page :sessionCode="session"/>
