<template>
    <div>
        <h2>ToDoリスト 作成</h2>

        <form @submit.prevent>
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
                <div class="form-element">
                    <dt>
                        <label>期限</label>
                    </dt>
                    <dd>
                        <vc-date-picker is-dark v-model="deadline" class="date-pick-element"/>
                    </dd>
                </div>
            </dl>

            <button @click="submitForm" class="form-btn">追加</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "ToDoCreate",

        data: function () {
            return {
                index: null,
                title: '',
                description: '',
                deadline: new Date(),
            }
        },

        methods: {
            submitForm() {
                if (this.title === '' || this.description === '') {
                    alert('タイトルまたは詳細を入力してください');
                    return 0;
                }
                this.$store.dispatch('createToDo', {
                    id: this.index,
                    title: this.title,
                    description: this.description,
                    deadline: this.deadline,
                    createdAt: new Date(),
                    checked: false
                });
                this.$store.dispatch('updateId');
                this.title = '';
                this.description = '';
            }
        },

        created() {
            this.index = this.$store.getters.getId;
        }
    }
</script>

<style scoped>
    form{
        width: 80%;
        background-color: #eaeaea;
        border-radius: 5px;
        border: #2c3e50 2px solid;
        padding:30px 50px;
        margin: 50px auto;
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

    form label {
        font-weight: bold;
        display: block;
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin: auto;
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
        background-color: cornsilk;
    }

    form .date-pick-element {
        display: block;
        width: 300px;
        height: 30px;
        padding: 5px 15px;
    }

    form .form-btn {
        font-weight: bold;
        padding: 10px 20px;
        background-color: aquamarine;
        border: #42b983 solid 1px;
        border-radius: 30px;
    }

    form .form-btn:hover {
        background-color: #42b983;
    }

    form .form-btn:focus {
        outline: none;
        background-color: #42b983;
    }

</style>