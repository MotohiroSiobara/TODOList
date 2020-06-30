<template>
    <div class="show-container">
        <h2>詳細ページ</h2>

        <p>タイトル: {{ listData.title }}</p>
        <p>詳細: {{ listData.description }}</p>
        <p>作成日時: {{ formattedDate(listData.createdAt) }}</p>
        <p v-if="listData.updatedAt">更新日時: {{ formattedDate(listData.updatedAt) }}</p>

        <div class="btn-section">
            <router-link :to="'/edit/'+ this.id" class="btn-item btn-inner-text edited-btn" tag="button">編集する</router-link>
            <button @click="modal =!modal" class="btn-item deleted-btn">削除する</button>
        </div>

        <!--   確認画面     -->
        <div v-if="modal" class="select-screen-locked">
            <div class="delete-container">
                <p class="delete-message">本当に削除してもよろしいですか？</p>

                <div class="delete-btn-section">
                    <button @click="modal = !modal" class="cancel-btn">キャンセル</button>
                    <button @click="deleteItem()" class="delete-btn">削除する</button>
                </div>
            </div>
        </div>
        <div v-if="modal" @click="modal = !modal" class="screen-locked"></div>
    </div>
</template>

<script>

    export default {
        name: "ToDoShow",

        data: function () {
            return {
                listData: null,
                id: null,
                modal: false,
            }
        },

        created() {
            this.id = this.$route.params.id;
            let listsData = this.$store.getters.ToDoLists;
            for (let i = 0; i < listsData.length; i++) {
                let list = listsData[i];
                // console.log(typeof list.id);
                // console.log(typeof this.id);
                if (list.id == Number(this.id)) {
                    this.listData = list;
                    break;
                }
            }
        },

        methods: {
            deleteItem() {
                let data = this.$store.getters.ToDoLists;
                // idが削除するidのリストを除いた配列を返す
                let newData = data.filter(list => list.id !== Number(this.id));
                this.$store.dispatch('recreateToDo', newData);
            }
        },

        computed: {
            formattedDate: function () {
                return function(date) {
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let hour = date.getHours();
                    let min = date.getMinutes();
                    let sec = date.getSeconds();
                    let formattedDay = year+"/"+month+"/"+day+" "+hour+"時"+min+"分"+sec+"秒";

                    return formattedDay;
                }
            }
        },
    }
</script>

<style scoped>
    .show-container {
        width: 80%;
        margin: 70px auto 0;
        padding: 20px;
        border: #2c3e50 solid 2px;
        border-radius: 10px;
    }

    .select-screen-locked {
        width: 300px;
        height: 150px;
        margin: 0 auto;
        border-radius: 30px;
        background-color: antiquewhite;
        z-index: 20;

        /* 子要素を上下中央揃え */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .delete-btn-section {
        display: flex;
        justify-content: space-around;

    }

    .delete-btn-section button {
        outline: none;
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
    }

    .cancel-btn:hover {
        background-color: lightskyblue;
    }

    .delete-btn {
        background-color: red;
        color: white;
        font-weight: bold;
    }

    .delete-btn:hover {
        background-color: darkred;
    }

    .screen-locked {
        height: 100%;
        width: 100%;
        background-color: black;
        opacity: 0.7;
        z-index: 20;
    }

    .btn-section {
        height: 100px;
        width: 100%;
        padding-top: 30px;
        display: flex;
        justify-content: space-around;
    }

    .btn-item {
        width: 100px;
        height: 50px;
        border-radius: 10px;
        flex: none;
        color: white;
        font-weight: bold;
        border: #2c3e50 solid 1px;
        outline: none;
    }

    .btn-inner-text {
        text-decoration: none;
    }

    .edited-btn {
        background-color: green;
    }

    .edited-btn:hover {
        background-color: darkslategrey;
    }

    .deleted-btn {
        background-color: red;
    }

    .deleted-btn:hover {
        background-color: darkred;
    }


</style>