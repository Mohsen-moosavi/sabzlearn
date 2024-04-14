import React from 'react'
import Input from '../../../components/Form/Inpit/Input'
import { requiredValidator } from '../../../Utils/Validator/Rouls'
import useForm from '../../../hooks/useForm'
import './Discount.css'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'

export default function Discount() {

    const [formState, onInputHandler] = useForm({
        discount: {
            value: '',
            isValid: false
        }
    }, false)

    function setDiscounts(event) {
        event.preventDefault()

        const reqBody = {
            discount: formState.initInputs.discount.value,
        };

        fetch(`${BASE_URL}offs/all`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
        })
            .then((res) => {
                if (res.ok) {
                    swal({
                        title: 'کمپین با موفقیت ایجاد شد',
                        icon: 'success',
                        buttons: "تایید"
                    })
                } else {
                    swal({
                        title: 'ایجاد کمپین با مشکل مواجه شد.',
                        icon: 'error',
                        buttons: "تایید"
                    })
                }
            })
    }

    return (
        <>
    <div className='admin-page-title app-title'>کمپین تخفیف</div>
            <div class="home-title">
                <span>برگزاری کمپین جدید</span>
            </div>
            <form class="form">
                <div class="col-12 col-md-6">
                    <div class="name input">
                        <label class="input-title">درصد تخفیف</label>
                        <Input
                            element={'input'}
                            id={'discount'}
                            validations={[
                                requiredValidator()
                            ]}
                            className={'input-item'}
                            onInputHandler={onInputHandler}
                            type={"number"}
                            placeholder={"لطفا درصد تخفیف همگانی را وارد کنید..."}
                        />
                        <span class="error-message text-danger"></span>
                    </div>
                </div>

                <div class="col-12">
                    <div class="bottom-form">
                        <div class="submit-btn">
                            <input type="submit" value="ایجاد کمپین" onClick={setDiscounts} disabled={!formState.isValidForm}/>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
