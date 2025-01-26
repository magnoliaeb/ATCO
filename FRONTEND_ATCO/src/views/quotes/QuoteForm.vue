<script setup>
import { useField, useForm } from "vee-validate";
import quotationSchema from "@/schemas/quotationSchema"; // Esquema de validación para la cotización
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { accessoryOptions, areas, departaments, items, modelOptions, negotiationTypes, peopleNumbers, usageTypes } from "../../data/catalogo";

const router = useRouter();
const route = useRoute();

// Definimos el formulario con validaciones y valores iniciales
const { handleSubmit, handleReset } = useForm({
    validationSchema: quotationSchema,
    initialValues: {
        asesor: 'juanperez@example.com',
        departament: null,  // Logística
        client: "",
        projectName: "",
        placeInstall: "",
        negotiationType: null, // Venta
        deliveryDate: "",
        biddingFile: "",
        observations: "",
        selectedModel: null,
        quantitiesW: "",
        quantitiesL: "",
        quantitiesH: "",
        width: "",
        length: "",
        selection: "",
        typeOfUse: "",
        requiredAreas: [],
        numberOfPeople: 1,
        airConditioning: "",
        voiceAndData: "",
        interiorFinish: "",
        selectedAccessories: []
    }
});

const editedQuotation = ref({});
const titleForm = computed(() => {
    return editedQuotation.value.id ? "Editar Cotización" : "Crear Cotización";
});

onMounted(() => {
    if (route.params.id) {
        // Cargar datos de cotización si se está editando
        editedQuotation.value.id = route.params.id;
    }
});
// validaciones model
const asesor = useField("asesor");
const client = useField("client");
const proyectName = useField("proyectName");
const placeInstall = useField("placeInstall");
const negotiationType = useField("negotiationType");
const departament = useField("departament");
const deliveryDate = useField("deliveryDate");
const biddingFile = useField("biddingFile");
const observations = useField("observations");

// PASOS
const step = ref(0);
const selectionProduct = ref(null);

const statusQuote = ref("cotizado");

// si es unidad movil
const selectedModel = ref(null);



// si es editficio prefabricado
const selectedW = ref('');
const quantitiesL = ref('');
const selectedH = ref('');
const quantitiesW = ref(['1', '2', '3', '4', '5', '10']);
const quantitiesH = ref(['1', '2']);

// si es skid
const selectedWidth = ref('');
const length = ref('');
const widthOptions = ref(['2.55m', '2.85m', '3.66m', 'Otro']);

// si es blox
const width = ref('2.53m');
// const length = ref('5.9m');
// const selection = ref('');
const options = ref(['Individual', 'Complejo']);

// Variables seleccion de uso
const typeOfUse = ref('');
const requiredAreas = ref([]);
const numberOfPeople = ref(1);







// Accessorios
const airConditioning = ref('');
const voiceAndData = ref('');
const interiorFinish = ref('');
const selectedAccessories = ref([]);
const extraAccessories = ref('');



const onSubmit = handleSubmit(async (values) => {
    // Guardar cotización (crear o editar)
    save();
});

const save = () => {
    if (editedQuotation.value.id) {
        Swal.fire({
            icon: "success",
            title: "Cotización actualizada",
            text: "La cotización ha sido actualizada correctamente",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            // router.push({ name: "quotations" });
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Cotización creada",
            text: "La cotización ha sido creada correctamente",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            // router.push({ name: "quotations" });
        });
        resetForm();
    }
};

function resetForm() {
    handleReset();
}

function nextStep() {
    if (step.value < 5) {
        step.value++
    }
}

function prevStep() {
    if (step.value >= 1) {
        step.value--
    }
}

</script>

<template>
    <section>
        <VRow>
            <VCol cols="12" md="8">
                <VCard class="pa-md-4 rounded-lg" flat>
                    <VCardText>
                        <VRow class="justify-space-between align-center">
                            <VCol cols="12" md="auto">
                                <h1 class="page-title mb-3 mb-sm-6">
                                    {{ titleForm }}
                                </h1>

                            </VCol>
                            <VCol cols="12" md="auto">
                                <VChipGroup v-model="statusQuote" selected-class="bg-primary">
                                    <VChip value="cotizado" variant="tonal" color="blue">Cotizado
                                    </VChip>
                                    <VChip value="aprobado" variant="tonal" color="green">Aprobado
                                    </VChip>
                                    <VChip value="rechazado" variant="tonal" color="red">Rechazado
                                    </VChip>
                                </VChipGroup>

                            </VCol>

                        </VRow>

                        <VForm @submit.prevent="onSubmit">
                            <VRow>
                                <VCol cols="12">
                                    <h2 class="font-weight-bold">Paso 1: Registro del asesor</h2>
                                </VCol>
                                <VCol cols="12" md="6">
                                    <VTextField label="Correo electrónico" variant="filled" readonly
                                        class="rounded-lg overflow-hidden" v-model="asesor.value.value" type="text"
                                        :error-messages="asesor.errorMessage.value">
                                    </VTextField>
                                </VCol>
                                <!-- Campo: Departamento -->
                                <VCol cols="12" md="6">
                                    <VSelect label="Departamento" variant="filled" class="rounded-lg overflow-hidden"
                                        v-model="departament.value.value" :items="departaments" item-value="id"
                                        item-title="label" :error-messages="departament.errorMessage.value">
                                    </VSelect>
                                </VCol>
                                <VCol cols="12">
                                    <h2 class="font-weight-bold">Paso 2: Registro del cliente</h2>
                                </VCol>
                                <!-- Campo: Cliente -->
                                <VCol cols="12">
                                    <VTextField id="client" label="Cliente" variant="filled"
                                        class="rounded-lg overflow-hidden" v-model="client.value.value" type="text"
                                        :error-messages="client.errorMessage.value">
                                    </VTextField>
                                </VCol>

                                <!-- Campo: Nombre del proyecto -->
                                <VCol cols="12" md="12">
                                    <VTextField id="proyectName" label="Nombre del proyecto" variant="filled"
                                        class="rounded-lg overflow-hidden" v-model="proyectName.value.value" type="text"
                                        :error-messages="proyectName.errorMessage.value">
                                    </VTextField>
                                </VCol>
                                <!-- Campo: lugar de instalacion -->
                                <VCol cols="12" md="12">
                                    <VTextField label="Lugar de instalación" variant="filled"
                                        class="rounded-lg overflow-hidden" v-model="placeInstall.value.value"
                                        type="text" :error-messages="placeInstall.errorMessage.value">
                                    </VTextField>
                                </VCol>



                                <!-- Campo: Tipo de Negociación -->
                                <VCol cols="12">
                                    <VSelect id="negotiationType" label="Tipo de Negociación" variant="filled"
                                        class="rounded-lg overflow-hidden" v-model="negotiationType.value.value"
                                        :items="negotiationTypes" item-value="id" item-title="label"
                                        :error-messages="negotiationType.errorMessage.value">
                                    </VSelect>
                                </VCol>

                                <!-- Mostrar Fecha de Entrega y Base de Licitación si elige 'Licitación' -->
                                <VCol v-if="negotiationType.value.value === 3" cols="6">
                                    <VTextField id="deliveryDate" label="Fecha de entrega" variant="filled"
                                        class="rounded-lg overflow-hidden" v-model="deliveryDate.value.value"
                                        type="date" :error-messages="deliveryDate.errorMessage.value">
                                    </VTextField>
                                </VCol>

                                <VCol v-if="negotiationType.value.value === 3" cols="6">
                                    <VTextField id="biddingFile" label="Archivo de Licitación" variant="filled"
                                        class="rounded-lg overflow-hidden" v-model="biddingFile.value.value" type="text"
                                        :error-messages="biddingFile.errorMessage.value">
                                    </VTextField>
                                </VCol>

                                <!-- Campo: Fecha de entrega -->
                                <!-- <VCol cols="12">
                                    <VTextField id="fechaEntrega" label="Fecha de Entrega" variant="filled"
                                        class="rounded-lg overflow-hidden" v-model="fechaEntrega.value.value"
                                        type="date" :error-messages="fechaEntrega.errorMessage.value">
                                    </VTextField>
                                </VCol> -->

                                <!-- Campo: Observaciones -->
                                <!-- <VCol cols="12">
                                    <VTextarea id="observaciones" label="Observaciones" variant="filled"
                                        class="rounded-lg overflow-hidden" v-model="observaciones.value.value"
                                        :error-messages="observaciones.errorMessage.value">
                                    </VTextarea>
                                </VCol> -->
                                <VCol cols="12">
                                    <h2 class="font-weight-bold">Paso 3: Sistema constructivo o producto </h2>
                                </VCol>
                                <VCol cols="12" class="">
                                    <v-item-group v-model="selectionProduct">
                                        <v-row>
                                            <v-col v-for="(item, i) in items" :key="i" cols="12" md="6" lg="4">
                                                <v-item v-slot="{ isSelected, toggle }" :value="item.id">
                                                    <v-card :color="isSelected ? 'primary' : '#f5f5f5'"
                                                        class="d-flex align-center rounded-lg justify-center" flat
                                                        @click="() => { toggle(); step = 0; }">
                                                        <VIcon>
                                                            {{ item.icon }}
                                                        </VIcon>
                                                        <v-card-title tag="h3">{{ item.label }}</v-card-title>
                                                    </v-card>
                                                </v-item>
                                            </v-col>
                                        </v-row>
                                    </v-item-group>
                                </VCol>
                                <VCol cols="12" v-if="selectionProduct">
                                    <v-stepper v-model="step">
                                        <VStepperHeader>
                                            <!-- <v-stepper-item value="1">Unidad Móvil</v-stepper-item> -->
                                            <v-stepper-item value="1">{{ selectionProduct === 1 ? 'Modelo' :
                                                'Medidas' }}</v-stepper-item>
                                            <v-stepper-item value="2">Seleccionar el uso</v-stepper-item>
                                            <v-stepper-item value="3">Accesorios</v-stepper-item>
                                            <v-stepper-item value="4">Subir plano de referencia</v-stepper-item>
                                        </VStepperHeader>

                                        <v-stepper-window>
                                            <!-- Paso 1: Medidas -->
                                            <v-stepper-window-item value="1">
                                                <VCardText v-if="selectionProduct === 1">
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <h4 class="mb-4">Seleccione el modelo</h4>
                                                            <v-item-group v-model="selectedModel">
                                                                <v-row>
                                                                    <v-col v-for="(model, i) in modelOptions" :key="i"
                                                                        cols="12" md="6" lg="4">
                                                                        <v-item v-slot="{ isSelected, toggle }"
                                                                            :value="model.id">
                                                                            <v-card
                                                                                :color="isSelected ? 'primary' : '#f5f5f5'"
                                                                                class="d-flex align-center rounded-lg justify-center"
                                                                                flat @click="toggle">

                                                                                <v-card-title tag="h3">{{ model.label
                                                                                    }}</v-card-title>
                                                                            </v-card>
                                                                        </v-item>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-item-group>
                                                        </v-col>
                                                    </v-row>
                                                </VCardText>

                                                <VCardText v-if="selectionProduct === 2">
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-select :items="quantitiesW" label="Cantidades de W"
                                                                v-model="selectedW"></v-select>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-text-field label="Cantidades de L"
                                                                v-model="quantitiesL"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-select :items="quantitiesH" label="Cantidades de H"
                                                                v-model="selectedH"></v-select>
                                                        </v-col>
                                                    </v-row>
                                                </VCardText>
                                                <VCardText v-if="selectionProduct === 3">
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-select :items="widthOptions" label="Ancho"
                                                                v-model="selectedWidth"></v-select>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-text-field label="Largo" v-model="length"
                                                                placeholder="Agregar Nota: Largo máximo 12m."></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </VCardText>
                                                <VCardText v-if="selectionProduct === 4">
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-text-field label="Ancho" v-model="width"
                                                                readonly></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-text-field label="Largo" v-model="length"
                                                                readonly></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-radio-group v-model="selection"
                                                                label="Seleccionar opción">
                                                                <v-radio label="Individual"
                                                                    value="Individual"></v-radio>
                                                                <v-radio label="Complejo" value="Complejo"></v-radio>
                                                            </v-radio-group>
                                                        </v-col>
                                                    </v-row>
                                                </VCardText>

                                                <VCardText v-if="selectionProduct === 5">
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-text-field label="Ancho" v-model="width"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-text-field label="Largo" v-model="length"
                                                                placeholder="Agregar Nota: Largo máximo 12m."></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-radio-group v-model="selection"
                                                                label="Seleccionar opción">
                                                                <v-radio label="Individual"
                                                                    value="Individual"></v-radio>
                                                                <v-radio label="Complejo" value="Complejo"></v-radio>
                                                            </v-radio-group>
                                                        </v-col>
                                                    </v-row>


                                                </VCardText>

                                                <v-card-actions>
                                                    <v-btn v-if="selectionProduct === 1 && selectedModel === null"
                                                        variant="flat" :disabled="selectedModel === null"
                                                        class="text-uppercase font-weight-bold"
                                                        :color="selectedModel === null ? 'tertiary' : 'primary'"
                                                        elevation="0" size="large" @click="nextStep">Siguiente</v-btn>
                                                    <v-btn v-else variant="flat" class="text-uppercase font-weight-bold"
                                                        color="primary" elevation="0" size="large"
                                                        @click="nextStep">Siguiente</v-btn>
                                                </v-card-actions>
                                            </v-stepper-window-item>

                                            <v-stepper-window-item value="2">
                                                <v-card-text>
                                                    <v-col cols="12">
                                                        <h4 class="mb-4">Tipo de uso</h4>
                                                        <v-select :items="usageTypes" label="Tipo de uso"
                                                            item-title="label" item-value="id"
                                                            v-model="typeOfUse"></v-select>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <h4 class="mb-4">Áreas requeridas dentro del espacio</h4>
                                                        <v-checkbox-group v-model="requiredAreas" column>
                                                            <v-checkbox hide-details density="compact"
                                                                v-for="area in areas" :key="area.id" :label="area.label"
                                                                :value="area.label"></v-checkbox>
                                                        </v-checkbox-group>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <h4 class="mb-4">Número de personas</h4>
                                                        <v-select :items="peopleNumbers" label="Número de personas"
                                                            item-title="label" item-value="id"
                                                            v-model="numberOfPeople"></v-select>
                                                    </v-col>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-btn variant="flat" class="text-uppercase font-weight-bold mr-3"
                                                        color="tertiary" elevation="0" size="large"
                                                        @click="prevStep">Anterior</v-btn>

                                                    <v-btn variant="flat" class="text-uppercase font-weight-bold"
                                                        color="primary" elevation="0" size="large"
                                                        @click="nextStep">Siguiente</v-btn>
                                                </v-card-actions>
                                            </v-stepper-window-item>

                                            <!-- Paso 3: Accesorios -->
                                            <v-stepper-window-item value="3">
                                                <v-card-text>
                                                    <row>
                                                        <v-col cols="12">
                                                            <h4 class="mb-4">Considerar aire acondicionado</h4>
                                                            <v-radio-group density="compact" inline
                                                                v-model="airConditioning">
                                                                <v-radio label="SI" value="SI"></v-radio>
                                                                <v-radio label="NO" value="NO"></v-radio>
                                                            </v-radio-group>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <h4 class="mb-4">Considerar voz y datos</h4>
                                                            <v-radio-group inline density="compact"
                                                                v-model="voiceAndData">
                                                                <v-radio label="SI" value="SI"></v-radio>
                                                                <v-radio label="NO" value="NO"></v-radio>
                                                            </v-radio-group>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <h4 class="mb-4">Acabado exterior</h4>
                                                            <v-radio-group inline density="compact"
                                                                v-model="interiorFinish">
                                                                <v-radio label="Melamina" value="Melamina"></v-radio>
                                                                <v-radio label="Glas liner"
                                                                    value="Glas liner"></v-radio>
                                                                <v-radio label="Otros" value="Otros"></v-radio>
                                                            </v-radio-group>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <h4 class="mb-4">Accesorios extras</h4>
                                                            <v-radio-group inline density="compact"
                                                                v-model="extraAccessories">
                                                                <v-radio label="SI" value="SI"></v-radio>
                                                                <v-radio label="NO" value="NO"></v-radio>
                                                            </v-radio-group>
                                                        </v-col>
                                                        <v-col cols="12" v-if="extraAccessories === 'SI'">
                                                            <h4 class="mb-4">Accesorios</h4>
                                                            <v-checkbox-group density="compact"
                                                                v-model="selectedAccessories" label="Accesorios" column>
                                                                <v-checkbox v-for="accessory in accessoryOptions"
                                                                    :key="accessory.id" :label="accessory.label"
                                                                    :value="accessory.id" hide-details></v-checkbox>
                                                            </v-checkbox-group>
                                                        </v-col>

                                                    </row>

                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-btn variant="flat" class="text-uppercase font-weight-bold mr-3"
                                                        color="tertiary" elevation="0" size="large"
                                                        @click="prevStep">Anterior</v-btn>
                                                    <v-btn variant="flat" class="text-uppercase font-weight-bold"
                                                        color="primary" elevation="0" size="large"
                                                        @click="nextStep">Siguiente</v-btn>
                                                </v-card-actions>
                                            </v-stepper-window-item>
                                            <v-stepper-window-item value="4">
                                                <v-card-text>
                                                    <h4 class="mb-4">Subir plano de referencia</h4>
                                                    <v-file-input density="compact" v-model="file" label="Subir"
                                                        placeholder="Subir" clearable></v-file-input>

                                                </v-card-text>
                                                <v-card-actions class="d-flex justify-space-between">
                                                    <div>
                                                        <v-btn variant="flat"
                                                            class="text-uppercase font-weight-bold mr-3"
                                                            color="tertiary" elevation="0" size="large"
                                                            @click="prevStep">Anterior</v-btn>
                                                        <VBtn variant="flat" class="text-uppercase font-weight-bold"
                                                            type="submit" color="primary" elevation="0" size="large">
                                                            Confirmar</VBtn>
                                                    </div>


                                                </v-card-actions>
                                            </v-stepper-window-item>
                                        </v-stepper-window>
                                    </v-stepper>
                                </VCol>
                                <VCol cols="12" class="d-flex justify-end">
                                    <VBtn :to="{ name: 'quotes' }" class="text-uppercase font-weight-bold"
                                        color="tertiary" elevation="0" variant="text" size="large">
                                        Cancelar</VBtn>
                                </VCol>



                            </VRow>
                        </VForm>
                    </VCardText>
                </VCard>

            </VCol>

        </VRow>
    </section>
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

h2 {
    font-size: $fs-sm;
    font-weight: 500;
    text-transform: uppercase;
}

section {
    position: relative;
}

h3 {
    font-size: $fs-sm;
    font-weight: 500;
    text-transform: uppercase;
    text-align: center;
}

.project-details {
    position: sticky;
    top: 0px;
    z-index: 1;
}
</style>
