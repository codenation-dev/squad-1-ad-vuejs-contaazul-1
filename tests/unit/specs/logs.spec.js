import { shallowMount } from '@vue/test-utils'
import Logs from "@/views/Logs/Logs"

describe("Logs", () => {
    it("Deve ser um instância do vue", () => {
        const wrapper = shallowMount(Logs, {
            mocks: {
                $store: {
                    getters: {
                        getComputedLogs: null,
                        getTab: null
                    }
                }
            }
        })
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
})