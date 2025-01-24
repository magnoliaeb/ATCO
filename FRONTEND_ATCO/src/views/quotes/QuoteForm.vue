<script setup>
import { useField, useForm } from "vee-validate";
import quotationSchema from "@/schemas/quotationSchema"; // Esquema de validación para la cotización
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";

const router = useRouter();
const route = useRoute();

// Definimos las opciones de los select con los IDs asignados
const negotiationTypes = [
    { id: 1, label: 'Venta' },
    { id: 2, label: 'Renta' },
    { id: 3, label: 'Licitación' },
    { id: 4, label: 'Otro' }
];

const departaments = [
    { id: 1, label: 'Ventas' },
    { id: 2, label: 'Compras' },
    { id: 3, label: 'Producción' },
    { id: 4, label: 'Logística' },
    { id: 5, label: 'Recursos Humanos' }
];


// Definimos el formulario con validaciones y valores iniciales
const { handleSubmit, handleReset } = useForm({
    validationSchema: quotationSchema,
    initialValues: {
        asesor: 'juanperez@example.com',
        client: "",
        projectName: "",
        departament: null,  // Logística
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

const asesor = useField("asesor");
const client = useField("client");
const proyectName = useField("proyectName");
const negotiationType = useField("negotiationType");
const departament = useField("departament");
const deliveryDate = useField("deliveryDate");
const biddingFile = useField("biddingFile");
const observations = useField("observations");



// PASOS
const step = ref(0);
const selectionProduct = ref(null);

// medidas
// si es unidad movil
const selectedModel = ref(null);

const modelOptions = ref([
    { id: 1, label: 'Modelo 1' },
    { id: 2, label: 'Modelo 2' },
    { id: 3, label: 'Modelo 3' },
    { id: 4, label: 'Modelo 4' },
    { id: 5, label: 'Modelo 5' }
]);
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

const usageTypes = ref([
    { id: 1, label: 'Oficina' },
    { id: 2, label: 'Dormitorios' },
    { id: 3, label: 'Baños' },
    { id: 4, label: 'Aulas' },
    { id: 5, label: 'Consultorio' },
    { id: 6, label: 'Otros' }
]);
const peopleNumbers = ref([
    { id: 1, label: '1-5', },
    { id: 2, label: '6-10', },
    { id: 3, label: '11-20', },
    { id: 4, label: '21-50', },
    { id: 5, label: 'Más de 50', }
])
const items = ref([
    {
        id: 1,
        label: 'Unidad Móvil',
        icon: 'mdi-truck',
    },
    {
        id: 2,
        label: 'Edificio Prefabricado',
        icon: 'mdi-home-modern',
    },
    {
        id: 3,
        label: 'Skid',
        icon: 'mdi-car-traction-control',
    },
    {
        id: 4,
        label: 'Blox',
        icon: 'mdi-cube',
    },
    {
        id: 5,
        label: 'Otro',
        icon: 'mdi-shape-outline',
    }
])

const areas = ref([
    { id: 1, label: 'Oficinas comunes o privadas' },
    { id: 2, label: 'Baños' },
    { id: 3, label: 'Recepción' },
    { id: 4, label: 'Dormitorio' },
    { id: 5, label: 'Site para servidor' },
    { id: 6, label: 'Cocineta' },
    { id: 7, label: 'Almacén' },
    { id: 8, label: 'Comedor' },
    { id: 9, label: 'Area de maquinas' },
    { id: 10, label: 'Laboratorio' },
    { id: 11, label: 'Otros' },
]);

// Accessorios
const airConditioning = ref('');
const voiceAndData = ref('');
const interiorFinish = ref('');
const selectedAccessories = ref([]);
const extraAccessories = ref('');

const accessoryOptions = [
    { id: 1, label: 'Refrigerador' },
    { id: 2, label: 'Extractor' },
    { id: 3, label: 'Sillas' },
    { id: 4, label: 'Accesorios de baños' },
    { id: 5, label: 'Detector de humo' },
    { id: 6, label: 'Lampara de plafon' },
    { id: 7, label: 'Lampara de spot' },
    { id: 8, label: 'Piso en rollo' },
    { id: 9, label: 'Ventanales' },
    { id: 10, label: 'Persianas' },
    { id: 11, label: 'Calentador de agua' },
    { id: 12, label: 'Hidroneumático' },
    { id: 13, label: 'Generador eléctrico' },
    { id: 14, label: 'Pantalla de TV' },
    { id: 15, label: 'Protector de ventana' },
    { id: 16, label: 'Otros' },
];

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
            <VCol cols="12" md="7">
                <VCard class="pa-md-4 rounded-lg" flat>
                    <VCardText>
                        <h1 class="page-title mb-3 mb-sm-6">
                            {{ titleForm }}
                        </h1>

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
                                                    <v-btn v-if="selectionProduct === 1" variant="flat"
                                                        :disabled="selectedModel === null"
                                                        class="text-uppercase font-weight-bold" color="primary"
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
            <VCol cols="12" md="5">
                <VCard class="pa-md-4 rounded-lg project-details" flat>
                    <VCardTitle>
                        <h2 class="font-weight-bold">Detalles del Proyecto</h2>
                    </VCardTitle>

                    <VCardText>
                        <!-- Datos del Asesor -->
                        <div class="mb-4">
                            <h4 class="mb-2 font-weight-medium">Datos del Asesor</h4>
                            <VRow>
                                <VCol cols="12" md="6">
                                    <p class="mb-1"><strong>Asesor:</strong> Maria Pérez</p>
                                </VCol>
                                <VCol cols="12" md="6">
                                    <p class="mb-1"><strong>Departamento:</strong> Ventas</p>
                                </VCol>
                            </VRow>
                        </div>

                        <!-- Datos del Cliente -->
                        <div class="mb-4">
                            <h4 class="mb-2 font-weight-medium">Datos del Cliente</h4>
                            <VRow>
                                <VCol cols="12" md="6">
                                    <!-- <p class="mb-1"><strong>Cliente:</strong> {{ values.client }}</p> -->
                                    <!-- <p class="mb-1"><strong>Proyecto:</strong> {{ values.projectName }}</p> -->
                                </VCol>
                                <VCol cols="12" md="6">
                                    <!-- <p class="mb-1"><strong>Departamento:</strong> {{ departaments.find(d => d.id ===
                                        values.department)?.label }}</p> -->
                                    <!-- <p class="mb-1"><strong>Tipo de Negociación:</strong> {{ negotiationTypes.find(n =>
                                        n.id === values.negotiationType)?.label }}</p> -->
                                </VCol>
                            </VRow>
                            <!-- <p class="mb-1"><strong>Observaciones:</strong> {{ values.observations || 'Ninguna' }}</p> -->
                        </div>

                        <!-- Datos del Proyecto -->
                        <div>
                            <h4 class="mb-2 font-weight-medium">Detalles del Proyecto</h4>
                            <!-- <VRow>
                                <VCol cols="12" md="6">
                                    <p class="mb-1"><strong>Modelo Seleccionado:</strong> {{ values.selectedModel ||
                                        'Sin definir' }}</p>
                                    <p class="mb-1"><strong>Cantidad (W x L x H):</strong> {{ values.quantitiesW }} x {{
                                        values.quantitiesL }} x {{ values.quantitiesH }}</p>
                                </VCol>
                                <VCol cols="12" md="6">
                                    <p class="mb-1"><strong>Dimensiones:</strong> {{ values.width }}m x {{ values.length
                                        }}m</p>
                                    <p class="mb-1"><strong>Selección:</strong> {{ values.selection || 'No especificada'
                                        }}</p>
                                </VCol>
                            </VRow> -->
                        </div>
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
