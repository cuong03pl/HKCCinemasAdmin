    <script>
    import axios from 'axios';
    import CloseIcon from '../Icon/CloseIcon.vue';
    export default {
        components: { CloseIcon, CloseIcon },
        props: {
            isOpen: Boolean,
            formFields: Array,
            data: Object,
            isCreate: Boolean,
            genresDataProps: Array,
        },
    data() {
        return {
        open: this.isOpen,
        FormData: this.isCreate ? this.initFormCreate() : this.initFormUpdate(),
        username: "",
        selectData: [],
        genresData: [],
        
        }
    },
    watch: {
        genresDataProps(newG, oldG){
                this.genresData = newG;
                
            }
        },
    methods: {
        initFormUpdate(){
                const init = {};
                this.formFields.forEach((field) => {
                    init[field.id] = this.data[field.id]; // tạo ra 1 abcd: ""
                });
        return init;
        },
        initFormCreate(){
                const init = {};
                this.formFields.forEach((field) => {
                    init[field.id] = ''; // tạo ra 1 abcd: ""
                });
        return init;
        },
        handleSubmit(){
            
            this.isCreate ?  this.$emit('handleCreate', this.FormData) : this.$emit('handleUpdate', this.data.id ,this.FormData);
            this.$emit('handleClose', false);

        },
        handleFileChange(event) {
            console.log(event.target.files[0].name);
            this.FormData["formFile"] = event.target.files[0];
            console.log(this.FormData);
        },

    }
    }
    </script>

    <template>
        <Teleport to="body">
            <div v-if="isOpen" class="bg-[#36445c4d] fixed h-full w-full top-0 right-0 left-0 flex justify-center items-center modal-overlay">
                <div  class="bg-white p-6 rounded-xl w-[900px] modal-content">
                    <div class="flex justify-between items-center">
                        <div class="font-bold text-[24px]">THÔNG TIN NHÂN VIÊN</div>
                        <CloseIcon :height="24" :width="24"  class="cursor-pointer" @click="$emit('handleClose', false)"/>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-2">
                        <div v-for="(item, index) in formFields" :key="index" class="w-[100%]">

                            <label for="">{{ item.title }} (<span class="text-[red]">*</span>)</label>

                            <!-- select -->
                            <select multiple v-if="item.isSelect" v-model="FormData[item.id]" :options="genresDataProps" class="block border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2">
                                <option v-for="(item, index) in genresDataProps" :key="index" :value="item.id">{{ item.name }}</option>
                            </select>

                            <!-- date -->
                            <input v-model="FormData[item.id]" type="date" v-if="item.isDate" class="block border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2"/>
                            <!-- file -->
                            <input @change="handleFileChange" type="file" :value="FormData[item.id]" v-if="item.isFile" class="block border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2"/>

                            <!-- text -->
                            <input v-if="item.isText" v-model="FormData[item.id]" class="block border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2" :placeholder="item.placeholder"   />
                        </div>
                        
                    </div>
                    
                    <div class="flex justify-end mt-3 gap-3">
                        <button @click="$emit('handleClose', false)" class="w-[100px] px-10 py-2 hover:bg-[#ccc] rounded-md flex justify-center">Đóng</button>
                        <button @click="handleSubmit" class="bg-[#019160] hover:bg-[#2fbe8e] w-[100px] text-white rounded-md flex justify-center items-center">Lưu</button>

                    </div>
                </div>
            </div>
        
        </Teleport>
        
    </template>

    <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

    <style scoped>

    .modal-overlay {
    transition: all 0.3s ease; /* Hiệu ứng fade */
    }
    .modal-content{
        transition: all 0.3s ease;
    }
    </style>