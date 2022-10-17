export default {
    name: "TimePick",
    props:['name','changehour','changemin','changeapm','index'],
    methods:{
        nowTime(){
            let now = new Date();
            let hour = now.getHours()%12;
            let hour_12 = hour<=0?12:hour;
            let minute = now.getMinutes();
            let element = now.getHours()>12?'pm':'am'
            return ([hour_12,minute,element]);
        }
    },
    template: `
    <div class="border  p-3 w-30 bg-white rounded-lg shadow-xl">
    <div class="flex">{{console.log(name)}}
        <select v-model="nowTime()[0]" @change="changehour($event,index)" name="hours" class="bg-transparent text-xl appearance-none outline-none mr-2">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
        </select>
            <span class="text-xl mr-2">:</span>
            <select v-model="nowTime()[1]" @change="changemin($event,index)" name="minutes" class="bg-transparent text-xl appearance-none outline-none mr-2" >
                <option value='0'>00</option>
                <option v-for="n in 59" :value="n">{{n}}</option>
            </select>
            
        </select>
        <select v-model="nowTime()[2]" @change="changeapm($event,index)" name="ampm" class="bg-transparent text-xl appearance-none outline-none">
            <option value="am">AM</option>
            <option value="pm">PM</option>
        </select>
    </div>
    </div>
    `
};
