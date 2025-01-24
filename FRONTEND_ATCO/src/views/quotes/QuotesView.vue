<script setup>
import Swal from 'sweetalert2';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { format, parseISO, differenceInDays } from 'date-fns';

const { mobile } = useDisplay();
const router = useRouter();
const page = ref(1);
const itemsPerPage = 10;
const selectedMonth = ref('');
const selectedStatus = ref(''); // Nueva variable para el filtro por estado

// Lista de meses
const months = [
    { text: 'Enero', value: '2024-01' },
    { text: 'Febrero', value: '2024-02' },
    { text: 'Marzo', value: '2024-03' },
    { text: 'Abril', value: '2024-04' },
    { text: 'Mayo', value: '2024-05' },
    { text: 'Junio', value: '2024-06' },
    { text: 'Julio', value: '2024-07' },
    { text: 'Agosto', value: '2024-08' },
    { text: 'Septiembre', value: '2024-09' },
    { text: 'Octubre', value: '2024-10' },
    { text: 'Noviembre', value: '2024-11' },
    { text: 'Diciembre', value: '2024-12' }
];

const statuses = ['Cotizado', 'Aprobado', 'Rechazado']; // Posibles estados para filtrar

const quotes = ref([
    { id: 1, total: 1200.50, status: 'Cotizado', createdAt: '2024-01-10T10:30:00Z', approvedAt: '2024-01-12T15:00:00Z', userId: 101, approvedBy: 201, cliente: 'Empresa A', items: ['Laptop', 'Mouse', 'Teclado'] },
    { id: 2, total: 850.75, status: 'Aprobado', createdAt: '2024-01-15T09:15:00Z', approvedAt: '2024-01-18T11:45:00Z', userId: 102, approvedBy: 202, cliente: 'Empresa B', items: ['Monitor', 'Silla ergonómica'] },
    { id: 3, total: 500.00, status: 'Rechazado', createdAt: '2024-02-02T14:20:00Z', approvedAt: null, userId: 103, approvedBy: null, cliente: 'Empresa C', items: ['Escritorio', 'Lámpara LED'] },
    { id: 4, total: 950.30, status: 'Cotizado', createdAt: '2024-02-10T10:00:00Z', approvedAt: null, userId: 104, approvedBy: null, cliente: 'Empresa D', items: ['Tablet', 'Stylus'] },
    { id: 5, total: 1500.40, status: 'Aprobado', createdAt: '2024-02-12T12:30:00Z', approvedAt: '2024-02-15T16:00:00Z', userId: 105, approvedBy: 203, cliente: 'Empresa E', items: ['Impresora', 'Tóner'] },
    { id: 6, total: 3200.25, status: 'Aprobado', createdAt: '2024-03-05T11:40:00Z', approvedAt: '2024-03-07T14:00:00Z', userId: 106, approvedBy: 204, cliente: 'Empresa F', items: ['Servidor', 'Router', 'Switch'] },
    { id: 7, total: 1200.10, status: 'Cotizado', createdAt: '2024-03-11T13:15:00Z', approvedAt: null, userId: 107, approvedBy: null, cliente: 'Empresa G', items: ['Disco Duro Externo'] },
    { id: 8, total: 1700.75, status: 'Rechazado', createdAt: '2024-03-18T10:10:00Z', approvedAt: null, userId: 108, approvedBy: null, cliente: 'Empresa H', items: ['Proyector', 'Pantalla de proyección'] },
    { id: 9, total: 1100.50, status: 'Aprobado', createdAt: '2024-04-02T09:00:00Z', approvedAt: '2024-04-04T12:20:00Z', userId: 109, approvedBy: 205, cliente: 'Empresa I', items: ['Auriculares', 'Micrófono'] },
    { id: 10, total: 890.00, status: 'Cotizado', createdAt: '2024-04-07T10:30:00Z', approvedAt: null, userId: 110, approvedBy: null, cliente: 'Empresa J', items: ['Mochila para laptop'] },
    { id: 11, total: 1450.60, status: 'Aprobado', createdAt: '2024-04-15T14:45:00Z', approvedAt: '2024-04-18T15:30:00Z', userId: 111, approvedBy: 206, cliente: 'Empresa K', items: ['Monitor', 'Docking Station'] },
    { id: 12, total: 700.30, status: 'Rechazado', createdAt: '2024-05-05T16:10:00Z', approvedAt: null, userId: 112, approvedBy: null, cliente: 'Empresa L', items: ['Teclado mecánico', 'Mouse inalámbrico'] },
    { id: 13, total: 2100.40, status: 'Aprobado', createdAt: '2024-05-12T11:50:00Z', approvedAt: '2024-05-14T13:00:00Z', userId: 113, approvedBy: 207, cliente: 'Empresa M', items: ['Cámara web', 'Trípode'] },
    { id: 14, total: 980.90, status: 'Cotizado', createdAt: '2024-06-01T10:20:00Z', approvedAt: null, userId: 114, approvedBy: null, cliente: 'Empresa N', items: ['Tablet', 'Cargador portátil'] },
    { id: 15, total: 1250.00, status: 'Cotizado', createdAt: '2024-06-07T09:30:00Z', approvedAt: null, userId: 115, approvedBy: null, cliente: 'Empresa O', items: ['Software de diseño gráfico'] },
    { id: 16, total: 2100.30, status: 'Rechazado', createdAt: '2024-06-15T14:50:00Z', approvedAt: null, userId: 116, approvedBy: null, cliente: 'Empresa P', items: ['Silla de oficina', 'Escritorio ajustable'] },
    { id: 17, total: 3400.20, status: 'Aprobado', createdAt: '2024-07-01T10:00:00Z', approvedAt: '2024-07-03T14:30:00Z', userId: 117, approvedBy: 208, cliente: 'Empresa Q', items: ['PC de escritorio', 'Monitor dual'] },
    { id: 18, total: 1890.50, status: 'Cotizado', createdAt: '2024-07-05T09:30:00Z', approvedAt: null, userId: 118, approvedBy: null, cliente: 'Empresa R', items: ['Consola de sonido', 'Altavoces'] },
    { id: 19, total: 1600.30, status: 'Aprobado', createdAt: '2024-07-12T13:00:00Z', approvedAt: '2024-07-14T12:30:00Z', userId: 119, approvedBy: 209, cliente: 'Empresa S', items: ['Cámara profesional', 'Lentes'] },
    { id: 20, total: 950.00, status: 'Rechazado', createdAt: '2024-08-02T11:30:00Z', approvedAt: null, userId: 120, approvedBy: null, cliente: 'Empresa T', items: ['Software antivirus', 'Firewall'] },
]);





const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Total', key: 'total' },
    { title: 'Estado', key: 'status' },
    { title: 'Fecha de Cotización', key: 'createdAt' },
    { title: 'Fecha de Aprobación', key: 'approvedAt' },
    { title: 'Días hasta Aprobación', key: 'daysToApprove', align: 'center' },
    { title: 'Ingeneiro', key: 'apprrovatedBy', },
    // { title: 'Ingeniero', key: 'aprrovatedBy' },
    { title: 'Acciones', key: 'actions', sortable: false }
];

const filteredQuotes = computed(() => {
    return quotes.value
});

const pageCount = computed(() => Math.ceil(filteredQuotes.value.length / itemsPerPage));

const paginatedQuotes = computed(() => {
    const start = (page.value - 1) * itemsPerPage;
    return filteredQuotes.value.slice(start, start + itemsPerPage);
});

const getDaysToApprove = (quote) => {
    if (quote.status !== 'Aprobado' || !quote.approvedAt) return '-';
    return differenceInDays(parseISO(quote.approvedAt), parseISO(quote.createdAt));
};

const averageApprovalTime = computed(() => {
    const approvedQuotes = quotes.value.filter(q => q.status === 'Aprobado' && q.approvedAt);
    if (approvedQuotes.length === 0) return 'No hay datos suficientes';
    const totalDays = approvedQuotes.reduce((sum, q) => sum + getDaysToApprove(q), 0);
    return (totalDays / approvedQuotes.length).toFixed(2) + ' días';
});

const deleteQuote = (id) => {
    Swal.fire({
        title: '¿Estás seguro de eliminar esta cotización?',
        text: '¡No podrás revertir esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            quotes.value = quotes.value.filter(q => q.id !== id);
            Swal.fire('¡Eliminado!', 'La cotización ha sido eliminada.', 'success');
        }
    });
};

const viewOrderDetails = (id) => {
    router.push({ name: 'order-details', params: { id } });
};

const createNewQuote = () => {
    router.push({ name: 'create-quote' });
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Cotizado':
            return 'text-purple';
        case 'Aprobado':
            return 'text-green';
        case 'Rechazado':
            return 'text-red';
        default:
            return '';
    }
};
</script>

<template>
    <v-card flat class="pa-md-4 rounded-lg">
        <VCardText>
            <h1 class="page-title mb-3 mb-sm-6">Cotizaciones</h1>
            <VRow class="justify-space-between">

                <VCol cols="12" sm="4">
                    <v-select v-model="selectedMonth" :items="months" item-value="value" item-title="text"
                        label="Filtrar por mes" variant="filled"></v-select>
                </VCol>
                <VCol cols="12" sm="4" class="d-flex justify-end">
                    <v-btn color="primary" variant="flat" size="large" class="text-uppercase font-weight-bold"
                        :to="{ name: 'create-quote' }">
                        <v-icon left>mdi-plus</v-icon> Crear
                    </v-btn>
                </VCol>
            </VRow>
        </VCardText>

        <VCardText>
            <v-data-table :items="paginatedQuotes" :headers="headers">
                <template v-slot:item.total="{ item }">
                    {{ formatCurrency(item.total) }}
                </template>
                <template v-slot:item.status="{ item }">
                    <VChip variant="outlined" :class="getStatusColor(item.status)" class="">
                        {{ item.status }}
                    </VChip>
                </template>
                <template v-slot:item.apprrovatedBy="{ item }">
                    {{ item.aprrovatedBy ? item.aprrovatedBy : '-' }}
                </template>
                <template v-slot:item.createdAt="{ item }">
                    {{ item.createdAt }}
                </template>
                <template v-slot:item.approvedAt="{ item }">
                    {{ item.approvedAt ? item.approvedAt : '-' }}
                </template>
                <template v-slot:item.daysToApprove="{ item }">
                    {{ getDaysToApprove(item) }}
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn :size="mobile ? 'x-small' : 'small'" color="orange" variant="tonal" icon
                        :to="{ name: 'edit-quote', params: { id: item.id } }">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn :size="mobile ? 'x-small' : 'small'" class="ml-2" variant="tonal" color="error" icon
                        @click="deleteQuote(item.id)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn :size="mobile ? 'x-small' : 'small'" class="ml-2" variant="tonal" color="info" icon
                        :to="{ name: 'quote-details', params: { id: item.id } }">
                        <v-icon>mdi-folder-open</v-icon>
                    </v-btn>
                </template>
                <template v-slot:bottom>
                    <div class="text-center pt-2">
                        <v-pagination :density="mobile ? 'compact' : 'default'" v-model="page" rounded="circle"
                            :length="pageCount"></v-pagination>
                    </div>
                </template>
            </v-data-table>
            <div class="text-center mt-4">
                <strong>Promedio de días hasta aprobación:</strong> {{ averageApprovalTime }}
            </div>
        </VCardText>
    </v-card>
</template>

<style lang="scss" scoped>
a {
    font-size: $fs-sm !important;
}
</style>