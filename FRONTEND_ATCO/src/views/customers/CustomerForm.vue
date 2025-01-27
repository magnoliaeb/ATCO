<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import Swal from "sweetalert2";

import customerSchema from "@/schemas/customerSchema";
import customerAPI from "@/api/customerAPI";

// Router
const router = useRouter();
const route = useRoute();

// Estado del formulario
const isLoading = ref(false);
const editedCustomerId = ref({});
const titleForm = computed(() => (editedCustomerId.value ? "Editar cliente" : "Crear cliente"));

// Configuración del formulario
const { handleSubmit, handleReset, setValues } = useForm({
    validationSchema: customerSchema,
    initialValues: {
        name: "Sonrisita",
        email: "sonrisita@example.com",
        phone: "+52 12 4056 7890",
        address: "Cancun, Quintana Roo, Mexico",
    }
});

// Campos del formulario
const name = useField("name");
const email = useField("email");
const phone = useField("phone");
const address = useField("address");

// Cargar cliente si existe
const { id } = route.params;
onMounted(() => {
    if (id) {
        fetchCustomer(id);
    } else {
        resetForm();
    }
});

// Obtener datos del cliente
const fetchCustomer = (id) => {
    customerAPI.getCustomerById(id).then((response) => {
        // console.log(response.data);
        if (response.success) {
            editedCustomerId.value = response.data.id;
            setValues({
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone,
                address: response.data.address

            });
        } else {
            router.push({ name: "customers" });
        }
    });
};

// Guardar cliente (crear o actualizar)
const saveCustomer = (values) => {
    isLoading.value = true;

    if (editedCustomerId.value) {

        customerAPI.updateCustomer(editedCustomerId.value, values).then((response) => {
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Cliente actualizado",
                    text: "El cliente ha sido actualizado correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    router.push({ name: "customers" });
                });
            }
            isLoading.value = false;

        });

    } else {

        customerAPI.createCustomer(values).then((response) => {
            console.log(response);
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Cliente creado",
                    text: "El cliente ha sido creado correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    router.push({ name: "customers" });
                });
            }
            isLoading.value = false;
        });
    }
};

// Enviar formulario
const onSubmit = handleSubmit(async ({ confirmPassword, ...values }) => {
    saveCustomer(values);
});

// Resetear formulario
function resetForm() {
    editedCustomerId.value = null;
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
                            <VTextField id="phone" label="Telefono" variant="filled" class="rounded-lg overflow-hidden"
                                v-model="phone.value.value" type="text" :error-messages="phone.errorMessage.value">
                            </VTextField>
                        </VCol>
                        <VCol>
                            <VTextarea id="address" label="Direccion" variant="filled"
                                class="rounded-lg overflow-hidden" v-model="address.value.value" type="text"
                                :error-messages="address.errorMessage.value"></VTextarea>
                        </VCol>
                        <VCol cols="12">
                            <VBtn :loading="isLoading" class="text-uppercase font-weight-bold" type="submit" block
                                color="primary" elevation="0" size="large">Confirmar</VBtn>
                        </VCol>
                        <VCol cols="12">
                            <VBtn :to="{ name: 'customers' }" class="text-uppercase font-weight-bold" type="submit"
                                block color="tertiary" elevation="0" variant="text" size="large">Cancelar</VBtn>
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
