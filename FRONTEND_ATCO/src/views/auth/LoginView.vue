<script setup>
import loginSchema from "@/schemas/loginSchema";
import { useAuthStore } from "@/stores/auth";
import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Store
const authStore = useAuthStore();

const { handleSubmit, resetForm } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    email: "michaelj@example.com",
    password: "mypassword",
  }
});

const showPassword = ref(false);
// Campos individuales
const email = useField("email");
const password = useField("password");

const onSubmit = handleSubmit(async (values) => {
  // Llamada a la API
  // await authStore.login(values);
  router.push({ name: 'dashboard' });
  // resetForm();
});
</script>

<template>
  <div class="py-8 py-md-16">
    <v-card class="pa-6 rounded-lg mx-auto" max-width="500" flat>

      <VCardTitle class=" page-title" tag="h1">
        Iniciar sesión
      </VCardTitle>
      <VCardText>
        <p class="">Bienvenido de nuevo a su cuenta.</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="onSubmit">
          <VRow>
            <!-- Campo: Email -->
            <VCol cols="12">
              <VTextField id="email" v-model="email.value.value" label="Correo Electrónico"
                placeholder="example@correo.com" type="email" variant="filled" class="rounded-lg overflow-hidden"
                :error-messages="email.errorMessage.value" />
            </VCol>

            <!-- Campo: Contraseña -->
            <VCol cols="12">
              <VTextField id="password" v-model="password.value.value" label="Contraseña"
                :type="showPassword ? 'text' : 'password'" variant="filled"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" class="rounded-lg overflow-hidden"
                :error-messages="password.errorMessage.value" />
            </VCol>
          </VRow>

          <!-- Botones -->
          <VRow>
            <VCol cols="12">
              <VBtn block class="text-uppercase font-weight-bold" flat size="large" color="primary" type="submit">
                Iniciar Sesión
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </v-card>
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
