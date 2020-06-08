import { shallowMount } from '@vue/test-utils'
import Index from "@/views/Logs/Index"

describe("IndexLogs", () => {
    it("Deve ser um instância do vue", () => {
        const wrapper = shallowMount(Index, {
            mocks: {
                $store: {
                    getters: {
                        getUser: {
                            name: null,
                            email: null
                        }
                    }
                }
            }
        })
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

})