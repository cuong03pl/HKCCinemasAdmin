<template>
  <div class="flex justify-center items-center py-8">
    <Paginate
      :page-count="Math.ceil(pageCount)"
      :click-handler="handlePageClick"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :active-class="'active-class'"
    />
  </div>
</template>

<script>
export default {
  props: {
    pageCount: Number,
  },
  methods: {
    handlePageClick(page) {
      this.$router.push({
        query: {
          ...this.$route.query,
          PageNumber: page,
        },
      });
      this.$emit("handlePagination", page);
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  list-style-type: none;
}
.page-item {
  margin: 0 5px;
  background: #cccccc75;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  font-weight: 500;
}
.page-link {
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.active-class {
  background: #0d6efd;
  color: #fff;
}
</style>
