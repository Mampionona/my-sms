<template>
  <div class="row">
    <div class="col-3">
      <div class="card">
      </div>
    </div>
    <div class="col-9">
    </div>
  </div>
</template>
<script>
import vTable from '@/components/vTable';
import List from '@/components/List';
import vBtn from '@/components/vBtn';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { vTable, List, vBtn },
  mounted () {
    this.getContacts(this.$route.params.listId);
  },
  methods: {
    ...mapActions({
      getContacts: 'contacts/getContactsOfList'
    })
  }
};
</script>
