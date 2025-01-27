<script setup>
import { useAuthStore } from '@/stores/auth';
import { format } from 'date-fns';

const authStore = useAuthStore();

const formatDate = (dateString) => {
    return format(new Date(dateString), 'PPP p');
};
</script>
<template>
    <v-card flat class="pa-md-4 rounded-lg" max-width="500">
        <v-card-title class="text-center page-title" tag="h1">Perfil de Usuario</v-card-title>
        <v-card-subtitle class="text-center text-body-2">{{ authStore.user?.role.toUpperCase() }}</v-card-subtitle>

        <v-card-text class="text-center">
            <v-avatar size="80">
                <v-img :src="authStore.user?.name_avatar_url" alt="User Avatar"></v-img>
            </v-avatar>
            <h2 class="mt-2">{{ authStore.user?.name }}</h2>
            <p class="text-caption text-grey-darken-1">{{ authStore.user?.email }}</p>
            <v-chip :color="authStore.user?.status ? 'green' : 'red'" class="mt-2">
                {{ authStore.user?.status ? 'Active' : 'Inactive' }}
            </v-chip>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text v-if="authStore.user">
            <v-list density="compact">
                <v-list-item>
                    <v-list-item-title>Creado:</v-list-item-title>
                    <v-list-item-subtitle>{{ formatDate(authStore.user.created_at) }}</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-card-text>

        <v-card-actions v-if="authStore.user?.role === 'admin'" class="d-flex justify-center">
            <v-btn :to="{ name: 'edit-user', params: { id: authStore.user?.id } }" color="primary">Edit
                Profile</v-btn>
        </v-card-actions>
    </v-card>
</template>


<style lang="scss" scoped></style>