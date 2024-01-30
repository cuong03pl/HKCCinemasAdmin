<template>
  <Teleport to="body">
   <div v-if="isOpen" class="bg-[#36445c4d] fixed h-full w-full top-0 right-0 left-0 flex justify-center items-center">
        <div  class="bg-white p-6 rounded-xl w-[900px]"> 
            <div class="flex justify-between items-center">
                <span></span>
                <CloseIcon :height="24" :width="24"  class="cursor-pointer" @click="$emit('handleClose', false)"/>
            </div>
            <span class="font-semibold text-[24px]">
                Bạn chắc chắn muốn xóa không ? 
            </span>
            <div class="flex justify-end mt-3 gap-3">
                    <button @click="$emit('handleClose', false)" class="w-[100px] px-10 py-2 hover:bg-[#ccc] rounded-md flex justify-center">Hủy</button>
                    <button @click="handleDelete" class="bg-[#dc3545] hover:bg-[#dc3546bb] w-[100px] text-white rounded-md flex justify-center items-center">Xóa</button>
            </div>
        </div>
   </div>
   </Teleport>
</template>

<script>
import CloseIcon from '../Icon/CloseIcon.vue';

export default {
    props: {
        isOpen: Boolean,
    },
    data() {
        return {
            open: this.isOpen,
        };
    },
    components: { CloseIcon },
    methods: {
        handleDelete(){
            this.$emit('handleDelete');
            this.$emit('handleClose', false);
        }
    }
}
</script>

<style>

</style>