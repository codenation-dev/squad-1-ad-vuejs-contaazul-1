import { shallowMount } from '@vue/test-utils'
import Register from "@/views/Register"

describe("Register", () => {
    it("Deve ser um instância do vue", () => {
        const wrapper = shallowMount(Register)
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it("Deve definir o primeiro elemento input com o valor de name do usuário passado", () => {
        const wrapper = shallowMount(Register, {
            data: function () {
                return {
                    name: "Teste teste"
                }
            }
        })

        const inputs = wrapper.findAll("input");
        const name = inputs.at(0);

        expect(name.element.value).toEqual("Teste teste");
    });

    it("Deve definir o segundo elemento input com o valor de email do usuário passado", () => {
        const wrapper = shallowMount(Register, {
            data: function () {
                return {
                    email: "errorlogs@teste.com"
                }
            }
        })

        const inputs = wrapper.findAll("input");
        const email = inputs.at(1);

        expect(email.element.value).toEqual("errorlogs@teste.com");
    });

    it("Deve definir o terceiro elemento input com o valor de passwrod do usuário passado", () => {
        const wrapper = shallowMount(Register, {
            data: function () {
                return {
                    password1: "123456"
                }
            }
        })

        const inputs = wrapper.findAll("input");
        const password1 = inputs.at(2);

        expect(password1.element.value).toEqual("123456");
    });

    it("Deve definir o quarto elemento input com o valor de ConfirmPasswrod do usuário passado", () => {
        const wrapper = shallowMount(Register, {
            data: function () {
                return {
                    password2: "123456"
                }
            }
        })

        const inputs = wrapper.findAll("input");
        const password2 = inputs.at(3);

        expect(password2.element.value).toEqual("123456");
    });

    it("Deve validar o vuelidate", () => {
        const wrapper = shallowMount(Register)
        wrapper.setData({
            name: "error",
            email: "errorlogs@teste.com",
            password1: "123456",
            password2: "123456",
        })
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
    });

    it("Deve ser chamado a função de addUser quando o click no botão de Registro for disparado", () => {
        const wrapper = shallowMount(Register)
        const addUser = jest.fn()
        wrapper.setMethods({
            addUser: addUser
        })

        const buttons = wrapper.findAll("button")
        buttons.at(1).trigger("click")
        expect(wrapper.vm.addUser).toBeCalled()

    });

    it("Deve ser chamado a função de validaCamposVazios quando o click no botão de Registro for disparado", () => {
        const wrapper = shallowMount(Register)

        wrapper.vm.validaCamposVazios = jest.fn()

        const buttons = wrapper.findAll("button")
        buttons.at(1).trigger("click")
        expect(wrapper.vm.validaCamposVazios).toBeCalled()

    });

    it("Deve ser chamado a função de hasEmailCadastrado quando o click no botão de Registro for disparado", () => {
        const wrapper = shallowMount(Register)

        wrapper.vm.hasEmailCadastrado = jest.fn()

        const buttons = wrapper.findAll("button")
        buttons.at(1).trigger("click")
        expect(wrapper.vm.hasEmailCadastrado).toBeCalled()

    });

    it("Deve ser chamado a função de redirect quando o click no botão de Voltar for disparado", () => {
        const wrapper = shallowMount(Register)
        wrapper.vm.$router = { push: jest.fn() };

        wrapper.vm.redirect();
        const [args] = wrapper.vm.$router.push.mock.calls[0];

        expect(args.name).toEqual("login");

    });

    it("Deve ser chamado a função de addUser quando o click nono botão de Registro for disparado", () => {
        const wrapper = shallowMount(Register)
        wrapper.setData({
            name: "error",
            email: "errorlogs@teste.com",
            password1: "123456",
            password2: "123456",
            hasEmail: false
        })
        wrapper.vm.addUser()
        expect(wrapper.vm.addUser).toBeCalled
    });


})