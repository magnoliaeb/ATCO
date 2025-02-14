<script setup>
import Swal from 'sweetalert2';
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay();
import userAPI from '@/api/userAPI';
import { debounce } from 'lodash';



const router = useRouter();
const search = ref('');

const users = ref([]);
const isLoadingTable = ref(false);
const isLoadingStatus = ref(false);
const selectedId = ref(null);
const page = ref(1);
let totalPages = ref(1);

// const itemsPerPage = 10;
const filters = computed(() => ({
    search: search.value,
    page: page.value
}));


watch(search, () => {
    page.value = 1;
    fetchUsers();
})



const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Nombre', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Rol', key: 'role' },
    { title: 'Estado', key: 'status', sortable: false, align: 'center' },
    { title: 'Acciones', key: 'actions', sortable: false }
];


// const paginatedUsers = computed(() => {
//     const start = (page.value - 1) * itemsPerPage;
//     return users.value.slice(start, start + itemsPerPage);
// });

onMounted(() => {
    fetchUsers();
});



const fetchUsers = debounce(() => {
    isLoadingTable.value = true;
    userAPI.getAllUsers(filters.value)
        .then((response) => {
            console.log(response);
            if (response.success) {
                users.value = response.data.users;
                totalPages.value = response.data.pagination.totalPages
            } else {
                users.value = [];
            }
        }).finally(() => {
            isLoadingTable.value = false
        })
}, 500);

const loadfetchUsers = (newPage) => {
    // console.log(newPage);
    filters.value.page = newPage;
    fetchUsers();
}


const deleteItem = (id) => {
    Swal.fire({
        title: 'Estas seguro de eliminar este usuario?',
        text: "No podras revertir esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            userAPI.deleteUser(id).then((response) => {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado!',
                        text: 'El usuario ha sido eliminado.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    fetchUsers();
                }
            })
        }
    })

};

const toggleStatus = (id) => {
    selectedId.value = id
    isLoadingStatus.value = true
    userAPI.updateUserStatus(id).then((response) => {
        if (response.success) {
            fetchUsers();
        }
    }).finally(() => {
        isLoadingStatus.value = false
    })

};

const getAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&`;
};

</script>

<template>
    <v-card flat class="pa-md-4 rounded-lg">
        <VCardText>
            <h1 class="page-title mb-3 mb-sm-6">
                Usuarios
            </h1>
            <VRow class="justify-space-between">
                <VCol cols="12" md="6" class="order-1 order-sm-0">
                    <v-text-field v-model="search" label="Buscar usuario" prepend-inner-icon="mdi-magnify"
                        variant="filled" class="rounded-t-lg overflow-hidden" flat hide-details
                        placeholder="Buscar por nombre o email" single-line></v-text-field>
                </VCol>
                <VCol cols="12" sm="auto" class="d-flex align-end order-0">
                    <v-btn color="primary" variant="flat" size="large" class="text-uppercase font-weight-bold"
                        :to="{ name: 'create-user' }">
                        <v-icon left>mdi-plus</v-icon> Agregar
                    </v-btn>

                </VCol>
            </VRow>


        </VCardText>
        <VCardText>
            <v-data-table :items="users" :headers="headers" :loading="isLoadingTable">
                <template v-slot:item.name="{ item }">
                    <!-- {{ item.name_avatar_url }} -->
                    <v-avatar v-if="!mobile" size="35">
                        <img class="bg-grey-lighten-3"
                            :src="item.name_avatar_url ? item.name_avatar_url : getAvatar(item.name)" :alt="item.name"
                            width="35" height="35" />
                    </v-avatar>
                    <span class="ml-2">{{ item.name }}</span>
                </template>
                <template v-slot:item.status="{ item }">
                    <v-btn :loading="isLoadingStatus && item.id === selectedId" :color="item.status ? 'green' : 'red'"
                        @click="toggleStatus(item.id)" icon :size="mobile ? 'x-small' : 'small'" variant="flat">
                        <v-icon>{{ item.status ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off' }}</v-icon>
                    </v-btn>
                </template>
                <template v-slot:item.actions="{ item }">
                    <div class="d-flex align-center" v-if="item.role !== 'admin'">
                        <v-btn :size="mobile ? 'x-small' : 'small'" color="orange" variant="tonal" icon
                            :to="{ name: 'edit-user', params: { id: item.id } }">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn :size="mobile ? 'x-small' : 'small'" class="ml-2" variant="tonal" color="error" icon
                            @click="deleteItem(item.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>

                    </div>
                </template>
                <template v-slot:bottom>
                    <div class="text-center pt-2">
                        <v-pagination :density="mobile ? 'compact' : 'default'" color="secondary" :total-visible="3"
                            v-model="page" rounded="circle" :length="totalPages"
                            @update:modelValue="loadfetchUsers"></v-pagination>
                    </div>
                </template>
            </v-data-table>

        </VCardText>
    </v-card>
</template>

<style lang="scss" scoped>
a {
    font-size: $fs-sm !important;
    width: 100%;
}

@media screen and (min-width: $sm) {
    a {
        width: auto;
    }
}
</style>