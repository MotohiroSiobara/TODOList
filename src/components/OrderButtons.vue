<template>
    <div class="order-section">
        <div class="order-section-container">
            <div v-if="flag === 0">
                <button @click="ascTime()">作成日時が早い順</button>
                <button @click="descTime()">作成日時が遅い順</button>
            </div>

            <div v-if="flag === 1">
                <button @click="ascDeadline()">期限が早い順</button>
                <button @click="descDeadline()">期限が遅い順</button>
            </div>
        </div>

        <button class="toggle" @click="changeFlag()">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="toggle-icon">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
            </svg>
        </button>
    </div>
</template>

<script>
    export default {
        name: "OrderButtons",

        data: function() {
            return {
                flag: 0,
            }
        },

        props: [
            'listsData'
        ],

        methods: {
            ascTime() {
                let newListsData = this.listsData.sort((a, b) => {
                    return (a.createdAt.getTime() < b.createdAt.getTime()) ? -1: 1;
                });
                this.$emit('updated', newListsData);
            },

            descTime() {
                let newListsData = this.listsData.sort((a, b) => {
                    return (a.createdAt.getTime() < b.createdAt.getTime()) ? 1: -1;
                });
                this.$emit('updated', newListsData);
            },

            ascDeadline() {
                let newListsData = this.listsData.sort((a, b) => {
                    return (a.deadline.getTime() < b.deadline.getTime()) ? -1: 1;
                });
                this.$emit('updated', newListsData);
            },

            descDeadline() {
                let newListsData = this.listsData.sort((a, b) => {
                    return (a.deadline.getTime() < b.deadline.getTime()) ? 1: -1;
                });
                this.$emit('updated', newListsData);
            },

            changeFlag() {
                this.flag === 0 ? this.flag = 1 : this.flag = 0;
            }

        },
    }
</script>

<style scoped>
    .order-section {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .order-section-container {
        margin-right: 20px;
    }

    .order-section-container button {
        padding: 5px 10px;
    }

    .toggle {
        background-color: white;
        border: blue solid 1px;
        border-radius: 20px;
        outline: none;
    }

    .toggle:hover {
        background-color: lavender;
    }

    .toggle-icon {
        fill: blue;
        padding: 3px;
    }
</style>