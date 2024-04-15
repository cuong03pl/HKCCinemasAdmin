<template>

    <div>

        <div>
           <span class=" text-[30px] font-bold">  Quản lý phim </span> 
           <ButtonHandleCreate @handleCreate="createNewActor" :selectListData="selectListData" :class="'mt-4 mb-4'" :formFields="formFields"/>
        </div>
        <div>
            <div class="flex justify-between font-medium  py-[16px] px-3 gap-2 bg-white">
                <span class="w-[15%]">Ảnh diễn viên</span>
                <span class="w-[30%]">Tên diễn viên</span>
                <span class="w-[35%]"></span>
                <span class="w-[20%]">Chức năng </span>
            </div>
            <div v-for="(item, index) in actorList" :key="index" class="flex justify-around items-center gap-2 border-t border-t-[#0000002f]  px-[16px] hover:bg-[#e5e5e5] py-[8px]">
                <div class="w-[15%]  flex items-center justify-center">
                    <img class="w-full h-full" :src="`https://localhost:7253/${item.image}` " alt="">
                </div> 
                <span class="w-[30%]">{{ item.name }}</span>
                <span class="w-[35%]">{{ }}</span>
                <span class="w-[20%]">
                    <ButtonHandleModal @handleDelete="deleteActor" @handleUpdate="updateActor" :data="item" :formFields="formFields" :selectListData="selectListData"/>
                </span>
            </div>
        </div>
        <ModelMessage :isOpen="toggleModalMessage" @handleClose="handleClose" :message="message"/>
    </div>
    
    
    
</template>
<script>
import ButtonHandleModal from '@/components/Modal/ButtonHandleModal.vue';
import axios from 'axios';
import ButtonHandleCreate from '@/components/Modal/ButtonHandleCreate.vue';
import ModelMessage from '@/components/Modal/ModelMessage.vue';
import convertTime from '../../config/functions';
import {formFields} from '../../config/formFields'
export default {
    data() {
        return {
            actorList: [],
            toggleModal: false,
            toggleModalDelete: false,
            toggleModalMessage: false,
            message: Object,
            selectListData: [],
            formFields: formFields.actor
        };
    },
    created() {
         this.fetchApi();
        this.loadData();
    },
    
    methods: {
        loadData(){
            axios.get("https://localhost:7253/api/Actors/getAllActors")
            .then((res) => this.actorList = res.data);
        },
        fetchApi() {
            try {
                axios.get("https://localhost:7253/api/Films")
                .then((res) => this.selectListData = JSON.parse(JSON.stringify(res.data)))  ;
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        },
        createNewActor(form_data){
                var formData = new FormData();
                formData.append("name", form_data.name);
                formData.append("formFile", form_data.image);
                if(form_data.filmIds){
                    form_data.filmIds?.forEach(item => {
                        formData.append("filmIds[]", item);
                    });
                }
            axios.post("https://localhost:7253/api/Actors",formData , {
                headers: {'Content-Type': 'multipart/form-data',}
            })
            .then((res) =>  {
                console.log(res);
                this.toggleModalMessage = true;
                 this.message = res.data;
                 this.loadData();
            } ).catch((err) => {
                console.log(err);
                if (err.response.status == 400){
                   this.message = "Vui lòng nhập đầy đủ thông tin";
                   this.toggleModalMessage = true;
                }
            }) 
            
            
        },
        updateActor(id, form_data){
            var formData = new FormData();
                formData.append("name", form_data.name);
                formData.append("formFile", form_data.image);
                if(form_data.filmIds){
                    form_data.filmIds?.forEach(item => {
                        formData.append("filmIds[]", item);
                    });
                }
                axios.put(`https://localhost:7253/api/Actors/${id}`,formData , {
                headers: {'Content-Type': 'multipart/form-data',}
            })
            .then((res) =>  {
                this.toggleModalMessage = true;
                 this.message = res.data;
                 this.loadData();
            } )
            .catch((err) => {
                if (err.response.status == 400){
                   this.message = "Vui lòng nhập đầy đủ thông tin";
                   this.toggleModalMessage = true;
                }
            })
            
            
        },
        deleteActor(id){
            axios.delete(`https://localhost:7253/api/Actors/${id}`)
            .then((res) =>  {
                this.toggleModalMessage = true;
                this.message = res.data;
                this.loadData();
            } )
            .catch((err) => {
                   this.message = "Xóa không thành công";
                   this.toggleModalMessage = true;
            })
        },
        handleClose(n){
            this.toggleModalMessage = n
        },
        convertTime,
    },
    components: { ButtonHandleModal, ButtonHandleCreate,ModelMessage }
}
</script>

<style></style>
       