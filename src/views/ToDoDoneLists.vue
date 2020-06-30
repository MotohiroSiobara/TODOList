<template>
    <div>
        <h2>終了したタスク</h2>

        <div v-if="doneCount === 0">
            <p>実行したタスクはまだありません。</p>
        </div>
        <div v-else>
            <OrderButtons :lists-data="ToDoLists" @updated="updatedListsOrder"></OrderButtons>
            <div v-for="list in ToDoLists" :key="list.title">
                <div v-if="list.checked">
                    <ToDoListElement :data="list" :index="list.id" class="done-list-style"></ToDoListElement>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ToDoListElement from "../components/ToDoListElement";
    import OrderButtons from "../components/OrderButtons";
    export default {
        name: "ToDoDoneLists",

        data() {
            return {
                ToDoLists: null,
                doneCount: 0,
            }
        },

        methods: {
            // リストの順番を変更する
            updatedListsOrder(data) {
                this.ToDoLists = data;
            }

        },

        components: {
            OrderButtons,
            ToDoListElement,
        },

        created() {
            this.ToDoLists = this.$store.getters.ToDoLists;

            for (let i = 0; i < this.ToDoLists.length; i++) {
                if (this.ToDoLists[i].checked) {
                    this.doneCount++;
                }
            }
        }
    }
</script>

<style scoped>
    .done-list-style >>> .element-container {
        background-color: lightcyan;
    }

    .done-list-style >>> .element-container:hover {
        background-color: powderblue;
    }
</style>