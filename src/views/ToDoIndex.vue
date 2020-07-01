<template>
    <div>
        <h2>To Do リスト一覧</h2>

        <div v-if="ToDoLists.length === 0">
            <p>まだToDoリストがありません。作成しよう！</p>
        </div>

        <div v-else>
            <!--  件数表示          -->
            <h3 v-if="doneCount === 0">残っているToDoタスクはありません。お疲れ様です！</h3>
            <h3 v-else>残り <span class="done-count-color">{{ doneCount }}</span> 件！ 頑張っていきましょう！</h3>

            <!--  検索バー          -->
            <div class="search-section">
                <input type="text" v-model="keyword" placeholder="検索する！" class="search-bar">

                <div v-if="filteredToDoLists.length > 0" class="show-hit-numbers">
                    <p><span>{{ filteredToDoLists.length }} 件</span> ヒット！</p>
                </div>
                <div v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="search-icon">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                </div>
            </div>

            <OrderButtons :lists-data="ToDoLists" @updated="updatedListsOrder"></OrderButtons>

            <!--   検索表示             -->
            <div v-if="keyword">
                <div v-if="filteredToDoLists.length === 0" class="no-element">
                    <p>検索に該当するタイトルのToDoリストはありません。<router-link to="/create" class="create-now-link">今すぐ作成する！</router-link></p>
                </div>

                <div v-for="ToDoList in filteredToDoLists" :key="ToDoList.id">
                    <ToDoListElement :data="ToDoList" :index="ToDoList.id"></ToDoListElement>
                    <div v-if="ToDoList !== filteredToDoLists.slice(-1)[0]" class="line"></div>
                </div>
            </div>

            <!--      通常表示          -->
            <div v-if="ToDoLists.length !== 0 && keyword === ''">
                <div v-for="ToDoList in ToDoLists" :key="ToDoList.id">
                    <ToDoListElement :data="ToDoList" :index="ToDoList.id"></ToDoListElement>
                    <div v-if="ToDoList !== ToDoLists.slice(-1)[0]" class="line"></div>
                </div>
            </div>
        </div>

        <!--   名言     -->
        <div v-if="quoteData !== null" class="quote-section">
            <h3>{{ quoteData.quote }}</h3>
            <p>{{ quoteData.author }}</p>
        </div>
    </div>
</template>

<script>
    import OrderButtons from "../components/OrderButtons";
    import ToDoListElement from "../components/ToDoListElement";
    import axios from 'axios';
    export default {
        name: "ToDoIndex",

        data() {
            return {
                keyword: '',
                ToDoLists: null,
                quoteData: null,
            }
        },

        computed: {
            doneCount: function () {
                let listCount = this.ToDoLists.length;
                for (let i = 0; i < this.ToDoLists.length; i++) {
                    if (this.ToDoLists[i].checked) {
                        listCount--;
                    }
                }

                return listCount;
            },

            filteredToDoLists: function () {
                let lists = [];
                if (this.keyword === '') {
                    return lists;
                }
                for (let i in this.ToDoLists) {
                    let list = this.ToDoLists[i];
                    if (list.title.indexOf(this.keyword) !== -1 || list.description.indexOf(this.keyword) !== -1) {
                        lists.push(list);
                    }
                }
                return lists;
            },
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

            axios({
                "method": "GET",
                "url": "https://quotable-quotes.p.rapidapi.com/randomQuotes",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "quotable-quotes.p.rapidapi.com",
                    "x-rapidapi-key": "b0f9ee0c0fmsh5ab0801181881f1p16421bjsn1e1c3b33aedb",
                    "useQueryString": true
                }
            }).then((response) => {
                this.quoteData = response.data;
            }).catch((error) => {
                    console.log(error)
                });
        }
    }
</script>

<style scoped>
    .done-count-color {
        color: red;
        font-weight: bold;
    }

    .search-section {
        width: 350px;
        height: 50px;
        margin: auto;
        position: relative;
    }

    .search-bar {
        height: 30px;
        width: 300px;
        padding: 5px 10px;
        border: darkslategrey solid 1px;
        border-radius: 5px;
        outline: none;
    }

    .search-bar:focus {
        text-decoration: none;
        border-color: cadetblue;
        background-color: cornsilk;
    }

    .show-hit-numbers {
        position: absolute;
        bottom: 0;
        right: 20px;
    }

    .show-hit-numbers span {
        font-weight: bold;
    }

    .search-icon {
        position: absolute;
        top: 10px;
        right: 25px;
    }

    .no-element {
        padding-top: 30px;
    }

    .create-now-link:visited {
        color: blue;
    }

    .line {
        width: 80%;
        margin: 30px auto 0;
        border: #2c3e50 2px solid;
    }

    .quote-section {
        margin-top: 200px;
    }
</style>