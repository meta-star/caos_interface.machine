export default {
    name: "MenuItem",
    props: {
        name: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false,
            default: () => ""
        },
        method: {
            type: Function,
            required: true
        }
    },
    computed: {
        iconPath() {
            return `/static/images/icons/${this.icon}.svg`;
        }
    },
    template: `
    <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.1s; animation-name: fadeInUp;">
        <div class="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
            <div class="inline-block text-gray-900 mb-4">
                <img width="50rem" height="50rem" :alt="name" :src="iconPath" />
            </div>
            <h3 class="text-lg leading-normal mb-2 font-semibold text-black">{{name}}</h3>
            <p class="text-gray-500" v-if="description">{{description}}</p>
        </div>
    </div>
    `
};
