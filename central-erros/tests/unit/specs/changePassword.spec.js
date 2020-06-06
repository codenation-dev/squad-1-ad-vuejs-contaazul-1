import { shallowMount, mount } from '@vue/test-utils'
import ChangePassword from "@/views/ChangePassword"

describe("ChangePassword", () => {
    it("Deve ser um instância do vue", () => {
        const wrapper = shallowMount(ChangePassword)
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it("Deve definir o primeiro elemento input com o valor de email do usuário passado", () => {
        const wrapper = shallowMount(ChangePassword, {
            data: function () {
                return {
                    email: "errorlogs@teste.com"
                }
            }
        })

        const inputs = wrapper.findAll("input");
        const email = inputs.at(0);

        expect(email.element.value).toEqual("errorlogs@teste.com");
    });

    it("Deve definir o segundo elemento input com o valor de passwrod do usuário passado", () => {
        const wrapper = shallowMount(ChangePassword, {
            data: function () {
                return {
                    newPassword: "123456"
                }
            }
        })

        const inputs = wrapper.findAll("input");
        const newPassword = inputs.at(1);

        expect(newPassword.element.value).toEqual("123456");
    });

    it("Deve definir o terceiro elemento input com o valor de confirmPasswrod do usuário passado", () => {
        const wrapper = shallowMount(ChangePassword, {
            data: function () {
                return {
                    confirmNewPassword: "123456"
                }
            }
        })

        const inputs = wrapper.findAll("input");
        const confirmNewPassword = inputs.at(2);

        expect(confirmNewPassword.element.value).toEqual("123456");
    });
})