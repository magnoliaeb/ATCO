<script setup>
import { useField, useForm } from "vee-validate";
import registerSchema from "@/schemas/registerSchema";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";

const router = useRouter();
const route = useRoute();

// store
const { handleSubmit, handleReset } = useForm({
    validationSchema: registerSchema,
    initialValues: {
        name: "Sonrisita",
        email: "sonrisita@example.com",
        password: "password",
        confirmPassword: "password",
    }
});

const editedUser = ref({});
const titleForm = computed(() => {
    return editedUser.value.id ? "Editar usuario" : "Crear usuario";
});

onMounted(() => {
    if (route.params.id) {
        // Editar usuario
        editedUser.value.id = route.params.id;
    }
});

const password = useField("password");
const email = useField("email");
const name = useField("name");
const confirmPassword = useField("confirmPassword");

const onSubmit = handleSubmit(async ({ confirmPassword, ...values }) => {
    // Guardar usuario (crear o editar)
    const saveUser = () => {
        if (editedUser.value.id) {
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado',
                text: 'El usuario ha sido actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                router.push({ name: 'users' });
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Usuario creado',
                text: 'El usuario ha sido creado correctamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                router.push({ name: 'users' });
            });
            resetForm();
        }
    };
});

function updateUser(user) {
    editedUser.value = { ...user };
}

function resetForm() {
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
