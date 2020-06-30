<template>
    <div>
        <h2>To Do リスト 編集</h2>

        <form @submit.prevent>
            <button @click="$router.back()" class="btn btn-back">戻る</button>
            <div class="form-container">
                <dl>
                    <div class="form-element">
                        <dt>
                            <label for="title">タイトル</label>
                        </dt>
                        <dd>
                            <input type="text" id="title" name="title" placeholder=" タイトル" v-model="title" class="title" required>
                        </dd>
                    </div>
                    <div class="form-element">
                        <dt>
                            <label for="description">詳細</label>
                        </dt>
                        <dd>
                            <input type="text" id="description" name="description" placeholder=" 詳細" v-model="description" class="description" required>
                        </dd>
                    </div>
                </dl>

                <button @click="submitForm" class="btn btn-edit">編集完了</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "ToDoEdit",

        data: function () {
            return {
                id: null,
                listData: null,
                title: null,
                description: null,
                deadline: null,
                checked: null,
            }
        },

        created() {
            this.id = this.$route.params.id;

            let listsData = this.$store.getters.ToDoLists;
            for (let i = 0; i < listsData.length; i++) {
                let list = listsData[i];
                if (list.id == Number(this.id)) {
                    this.listData = list;
                    break;
                }
            }

            this.title = this.listData.title;
            this.description = this.listData.description;
            this.deadline = this.listData.deadline;
            this.checked = this.listData.checked;
        },

        methods: {
            submitForm() {
                if (this.title === '' || this.description === '') {
                    alert('タイトルまたは詳細を入力してください');
                } else {
                    this.$store.dispatch('editToDo', {
                        id: Number(this.id),
                        title: this.title,
                        description: this.description,
                        deadline: this.deadline,
                        checked: this.checked,
                        createdAt: this.listData.createdAt,
                        updatedAt: new Date(),
                    });
                }
            }
        }
    }
</script>

<style scoped>
    form{
        background-color: #eaeaea;
        padding:30px 50px;
        margin: auto;
        display: flex;
        justify-content: center;
    }

    .form-container {
        position: relative;
    }

    form label {
        display: block;
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin: auto;
        font-weight: bold;
    }

    form input {
        display: block;
        width: 300px;
        height: 30px;
        padding: 5px 15px;
        border: #2c3e50 1px solid;
        border-radius: 20px;
    }

    form input:focus {
        outline: none;
        border: #42b983 2px solid;
        border-radius: 20px;

    }

    form .form-element {
        width: 500px;
        height: 30px;
        padding: 10px;
        margin: 20px auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    form .btn {
        cursor: grab;
        padding: 10px 20px;
        border: #2c3e50 1px solid;
        border-radius: 10px;
        color: white;
        font-weight: bold;
    }

    form .btn:focus {
        outline: none;
    }

    form .btn-edit {
        margin-top: 20px;
        background-color: red;
        border: maroon 1px solid;
    }

    form .btn-edit:hover {
        background-color: maroon;
    }


    form .btn-back {
        color: blue;
        border: blue 1px solid;
    }

    form .btn-back:hover {
        background-color: white;
    }

    form .btn-back:focus {
        background-color: white;
    }
</style>