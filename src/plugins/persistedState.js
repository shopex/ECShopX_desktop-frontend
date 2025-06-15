import createPersistedState from 'vuex-persistedstate'

export default ({ app, store }) => {
  createPersistedState({
    reducer(val){
        return {
            user: val.user,
            locale: val.locale//保存app module中的state，一定要key+value形式
        };
      }
  })(store)
}
