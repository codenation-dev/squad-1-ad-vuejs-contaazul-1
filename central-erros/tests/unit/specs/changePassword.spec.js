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

    it("Deve ser chamado a função de validaCamposVazios quando o click no botão de Mudar Senha for disparado", () => {
        const wrapper = shallowMount(ChangePassword)

        wrapper.vm.validaCamposVazios = jest.fn()

        const buttons = wrapper.findAll("button")
        buttons.at(1).trigger("click")
        expect(wrapper.vm.validaCamposVazios).toBeCalled()

    });

    it("Deve ser chamado a função de validaUser quando o click no botão de Mudar Senha for disparado", () => {
        const wrapper = shallowMount(ChangePassword)
        const validaUser = jest.fn()
        wrapper.setMethods({
            validaUser: validaUser
        })

        const buttons = wrapper.findAll("button")
        buttons.at(1).trigger("click")
        expect(wrapper.vm.validaUser).toBeCalled()

    });

    it("Deve ser chamado a função de redirect quando o click no botão de Voltar for disparado", () => {
        const wrapper = shallowMount(ChangePassword)
        wrapper.vm.$router = { push: jest.fn() };

        wrapper.vm.redirect();
        const [args] = wrapper.vm.$router.push.mock.calls[0];

        expect(args.name).toEqual("login");

    });

    it("Deve validar o vuelidate", () => {
        const wrapper = shallowMount(ChangePassword)

        wrapper.setData({
            email: "errorlogs@teste.com",
            newPassword: "123456",
            confirmNewPassword: "123456"
        })
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
    });

    it("Deve chamar changePassword quando o click no botão de Mudar Senha for disparado", () => {
        const wrapper = shallowMount(ChangePassword)
        wrapper.vm.validaUser()
        wrapper.setData({
            email: "errorlogs@teste.com",
            newPassword: "123456",
            confirmNewPassword: "123456"
        })
        expect(wrapper.vm.changePassword).toBeCalled
    });

})