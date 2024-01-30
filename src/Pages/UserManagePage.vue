<template>

    <div>

        <div>
           <span class=" text-[30px] font-bold">  Quản lý người dùng </span> 
           <ButtonHandleCreate @handleCreate="createNewUser"  :class="'mt-4 mb-4'" :formFields="formFields"/>
        </div>
        <div>
            <div class="flex justify-between font-medium  py-[16px] px-3 bg-white">
                <!-- <span class="w-[25%]">ID</span> -->
                <span class="w-[40%]">Tài khoản</span>
                <span class="w-[40%]">Mật khẩu</span>
                <span class="w-[20%]">Chức năng </span>
            </div>
            <div v-for="(item, index) in userList" :key="index" class="flex justify-around items-center  border-t border-t-[#0000002f] h-[48px] px-[16px] hover:bg-[#e5e5e5]">
                <!-- <span class="w-[25%]">{{ item.id }}</span> -->
                <span class="w-[40%]">{{ item.username }}</span>
                <span class="w-[40%]">{{ item.password }}</span>
                <span class="w-[20%]">
                    <ButtonHandleModal @handleDelete="deleteUser" :data="item" :formFields="formFields" @handleUpdate="updateUser"/>
                </span>
            </div>
        </div>
        <ModelMessage :isOpen="toggleModalMessage" @handleClose="handleClose" :message="this.message"/>
    </div>
    
    
    
</template>
<script>
import ButtonHandleModal from '@/components/Modal/ButtonHandleModal.vue';
import axios from 'axios';
import ButtonHandleCreate from '@/components/Modal/ButtonHandleCreate.vue';
import ModelMessage from '@/components/Modal/ModelMessage.vue';
import { formFields } from '../../config/formFields';
export default {
    data() {
        return {
            userList: [],
            toggleModal: false,
            toggleModalDelete: false,
            toggleModalMessage: false,
            message: Object,
            formFields: formFields.user
        };
    },
    mounted() {
        this.loadUser();
        
    },
    methods: {
        loadUser(){
            axios.get("https://localhost:7253/api/Users/getAllUsers")
            .then((res) => this.userList = res.data);
        },
        createNewUser(form_data){
            console.log(form_data);
            console.log(form_data.username);
            var formData = new FormData();
                formData.append("username", form_data.username);
                formData.append("password", form_data.password);

            axios.post("https://localhost:7253/api/Users/createUser", formData, {
                headers: {'Content-Type': 'multipart/form-data',}
            })
            .then((res) =>  {
                this.toggleModalMessage = true;
                 this.message = res;
                 this.userList.push(JSON.parse(res.config.data) );
                 console.log(this.userList);
            } );
        },
        deleteUser(id){
            axios.delete(`https://localhost:7253/api/Users/deleteUser/${id}`)
            .then((res) =>  {
                this.toggleModalMessage = true;
                 this.message = res;
                this.loadUser();
            } );
        },
        updateUser(id, form_data){
            console.log(form_data);
            console.log(form_data.username);
            var formData = new FormData();
                formData.append("id", id);
                formData.append("username", form_data.username);
                formData.append("password", form_data.password);
                console.log(formData);
            axios.put(`https://localhost:7253/api/Users/updateUser/${id}`, formData, {
                headers: {'Content-Type': 'multipart/form-data',}
            })
            .then((res) =>  {
                console.log(res);
                this.toggleModalMessage = true;
                 this.message = res;
                this.loadUser();
            } );
        },
        handleClose(n){
            this.toggleModalMessage = n
        }
    },
    components: { ButtonHandleModal, ButtonHandleCreate,ModelMessage }
}
</script>

<style></style>
       