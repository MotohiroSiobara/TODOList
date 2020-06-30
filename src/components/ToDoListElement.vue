<template>
    <div>
        <router-link :to="'/list/' + index" class="element">
            <div class="element-container">
                <h2 class="title">{{ data.title }}</h2>
                <div class="description">{{ data.description }}</div>
                <!--   日付: 期限             -->
                <div class="icon-section">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"/></svg>
                    <div>{{ formattedDate(data.deadline, 1) }}</div>
                </div>
                <!--   日付: 作成日時             -->
                <div class="icon-section">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                    <div>{{ formattedDate(data.createdAt) }}</div>
                </div>
                <!--   日付: 更新日時           -->
                <div v-if="data.updatedAt" class="icon-section update-icon-section">
                    <svg class="icon update-size" xmlns="http://www.w3.org/2000/svg" height="24" enable-background="new 0 0 24 24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24" x="0"/></g><g><g><g><path d="M21,10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-0.1c-2.73,2.71-2.73,7.08,0,9.79s7.15,2.71,9.88,0 C18.32,15.65,19,14.08,19,12.1h2c0,1.98-0.88,4.55-2.64,6.29c-3.51,3.48-9.21,3.48-12.72,0c-3.5-3.47-3.53-9.11-0.02-12.58 s9.14-3.47,12.65,0L21,3V10.12z M12.5,8v4.25l3.5,2.08l-0.72,1.21L11,13V8H12.5z"/></g></g></g></svg>
                    <div>{{ formattedDate(data.updatedAt) }}</div>
                </div>
                <svg v-if="this.$route.path === '/lists/done'" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="checked-mark">
                    <title/><g data-name="Layer 28" id="Layer_28"><path class="cls-1" d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"/><path class="cls-1" d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"/></g>
                </svg>
                <!--  期限まで今日から何日か？          -->
                <div class="diff-days-section">
                    <div v-if="diffDaysForDeadline > 0">
                        期限まであと<span>{{ diffDaysForDeadline }}</span>日！
                    </div>
                    <div v-else-if="diffDaysForDeadline === 0">
                        <span>今日</span>まで！
                    </div>
                    <div v-else>
                        期限切れ
                    </div>
                </div>
            </div>
        </router-link>
        <div v-if="this.$route.path === '/'" class="checkbox">
            <label :for="index" class="checked-label">チェック</label>
            <input type="checkbox" :id="index" v-model="data.checked" class="checkbox-input">
        </div>
    </div>
</template>

<script>
    export default {
        name: "ToDoListElement",

        computed: {
            formattedDate: function () {
                return function(date, flag=0) {
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let hour = date.getHours();
                    let min = date.getMinutes();
                    let sec = date.getSeconds();

                    let formattedDay = year+"/"+month+"/"+day+" "+hour+"時"+min+"分"+sec+"秒";
                    if (flag === 1) {
                        formattedDay = year+"/"+month+"/"+day;
                    }
                    return formattedDay;
                }
            },

            diffDaysForDeadline: function () {
                let deadline = this.data.deadline.getTime();
                let now = new Date().getTime();
                let diffDays = Math.floor((deadline - now) / 86400000) + 1;
                return diffDays;
            }
        },

        props: [
            'data',
            'index',
        ],
    }
</script>

<style scoped>
    .element {
        color: #2c3e50;
        text-decoration: none;
        padding: 5px 3px;
    }

    /* visited後の色を変えない*/
    .element:visited {
        color: #2c3e50;
    }

    .element-container {
        border: #2c3e50 2px solid;
        border-radius: 10px;
        padding: 0 0 30px;
        margin: 20px 100px;
        background-color: lightgoldenrodyellow;
        position: relative;
    }

    .element-container:hover {
        background-color: khaki;
    }

    .description {
        padding-bottom: 20px;
    }

    .icon-section {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
    }

    .icon {
        height: 24px;
        width: 24px;
        padding-right: 5px;
    }

    /* svgの大きさの差異の調整 */
    .update-icon-section {
        position: relative;
        right: 4px;
    }

    .update-size {
        height: 27px;
        width: 27px;
    }
    /* */

    .diff-days-section {
        font-weight: bold;
        position: absolute;
        right: 40px;
        bottom: 20px;
    }

    .diff-days-section span {
        font-size: 30px;
        color: red;
    }

    .checkbox {
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .checked-label:hover {
        font-weight: bold;
        color: #2c3e50;
    }

    .checkbox-input {
        width: 20px;
        height: 20px;
        border-radius: 3px;
    }

    .checked-mark {
        width: 100px;
        height: 100px;
        fill: #42b983;
        position: absolute;
        top: 10px;
        right: 50px;
    }
</style>