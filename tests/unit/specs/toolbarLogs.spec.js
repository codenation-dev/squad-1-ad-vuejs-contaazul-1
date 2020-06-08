import { shallowMount } from '@vue/test-utils'
import Toolbar from "@/views/Logs/Toolbar"

describe("Toolbar", () => {
    it("Deve ser um instância do vue", () => {
        const wrapper = shallowMount(Toolbar)
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it("Deve definir o elemento input com o valor de busca passado", () => {
        const wrapper = shallowMount(Toolbar, {
            data: function () {
                return {
                    inputBusca: "teste"
                }
            }
        })

        const input = wrapper.find("input");

        expect(input.element.value).toEqual("teste");
    });

})