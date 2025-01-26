<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import Swal from "sweetalert2";
import registerSchema from "@/schemas/registerSchema";
import userAPI from "@/api/userAPI";

// Opciones de roles y estado
const roles = [
    { text: "Vendedor", value: "vendedor" },
    // { text: "Administrador", value: "admin" },
    { text: "Ingeniero", value: "ingeniero" }
];

const statusItems = [
    { text: "Activo", value: true },
    { text: "Inactivo", value: false }
];

// Router
const router = useRouter();
const route = useRoute();

// Estado del formulario
const editedUserId = ref({});
const titleForm = computed(() => (editedUserId.value ? "Editar usuario" : "Crear usuario"));

// Configuración del formulario
const { handleSubmit, handleReset, setValues } = useForm({
    validationSchema: registerSchema,
    initialValues: {
        name: "Sonrisita",
        email: "sonrisita@example.com",
        password: "password",
        confirmPassword: "password",
        role: "vendedor",
        status: true
    }
});

// Campos del formulario
const name = useField("name");
const email = useField("email");
const password = useField("password");
const confirmPassword = useField("confirmPassword");
const role = useField("role");
const status = useField("status");

// Cargar usuario si existe
const { id } = route.params;
onMounted(() => {
    if (id) {
        fetchUser(id);
    } else {
        resetForm();
    }
});

// Obtener datos del usuario
const fetchUser = (id) => {
    userAPI.getUserById(id).then((response) => {
        // console.log(response.data);
        if (response.success) {
            editedUserId.value = response.data.id;
            setValues({
                name: response.data.name,
                email: response.data.email,
                password: response.data.password,
                confirmPassword: response.data.password,
                role: response.data.role,
                status: response.data.status
            });
        } else {
            router.push({ name: "users" });
        }
    });
};

// Guardar usuario (crear o actualizar)
const saveUser = (values) => {
    if (editedUserId.value) {
        userAPI.updateUser(editedUserId.value, values).then((response) => {
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Usuario actualizado",
                    text: "El usuario ha sido actualizado correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    router.push({ name: "users" });
                });
            }
        });
    } else {
        userAPI.createUser(values).then((response) => {
            console.log(response);
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Usuario creado",
                    text: "El usuario ha sido creado correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    router.push({ name: "users" });
                });
            }
        });
    }
};

// Enviar formulario
const onSubmit = handleSubmit(async ({ confirmPassword, ...values }) => {
    saveUser(values);
});

// Resetear formulario
function resetForm() {
    editedUserId.value = null;
    handleReset();
}
</script>


<template>
    <div class="">
        <VCard class="pa-md-4 rounded-lg" max-width="550" flat>
            <VCardText>
                <h1 class="page-title mb-3 mb-sm-6">
                    {{ titleForm }}
                </h1>
                <VForm @submit.prevent="onSubmit">
                    <VRow>
                        <VCol cols="12">
                            <VTextField id="name" label="Nombre" variant="filled" class="rounded-lg overflow-hidden"
                                v-model="name.value.value" type="text" :error-messages="name.errorMessage.value">
                            </VTextField>
                        </VCol>
                        <VCol cols="12">
                            <VTextField id="email" label="Correo Electrónico" variant="filled"
                                class="rounded-lg overflow-hidden" v-model="email.value.value" type="email"
                                :error-messages="email.errorMessage.value"></VTextField>
                        </VCol>
                        <VCol cols="12" md="6">
                            <VSelect id="role" label="Rol" variant="filled" class="rounded-lg overflow-hidden"
                                v-model="role.value.value" :items="roles" item-value="value" item-title="text"
                                :error-messages="role.errorMessage.value"></VSelect>
                        </VCol>
                        <VCol cols="12" md="6">
                            <VSelect id="status" label="Estado" variant="filled" class="rounded-lg overflow-hidden"
                                v-model="status.value.value" :items="statusItems" item-value="value" item-title="text"
                                :error-messages="status.errorMessage.value"></VSelect>

                        </VCol>
                        <VCol cols="12">
                            <VTextField id="password" label="Contraseña" variant="filled"
                                class="rounded-lg overflow-hidden" v-model="password.value.value" type="password"
                                :error-messages="password.errorMessage.value"></VTextField>
                        </VCol>
                        <VCol>
                            <VTextField id="confirmPassword" label="Confirmar Contraseña" variant="filled"
                                class="rounded-lg overflow-hidden" v-model="confirmPassword.value.value" type="password"
                                :error-messages="confirmPassword.errorMessage.value"></VTextField>
                        </VCol>
                        <VCol cols="12">
                            <VBtn class="text-uppercase font-weight-bold" type="submit" block color="primary"
                                elevation="0" size="large">Confirmar</VBtn>
                        </VCol>
                        <VCol cols="12">
                            <VBtn :to="{ name: 'users' }" class="text-uppercase font-weight-bold" type="submit" block
                                color="tertiary" elevation="0" variant="text" size="large">Cancelar</VBtn>
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>
        </VCard>
    </div>
</template>

<style lang="scss" scoped>
button,
a {
    font-size: $fs-sm !important;
}

h1 {
    font-size: $fs-2xl;
    font-weight: 700;
}

a.forgot-password {
    color: #8d8d8d;

    &:hover {
        text-decoration: underline !important;
    }
}
</style>
