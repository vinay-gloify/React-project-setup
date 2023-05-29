import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const ReactHookForm = () => {
    const form = useForm({
        //for setting a default value

        defaultValues:{
            username:'Batman',
            email:'',
            channel:'',
            social:{
                twitter:"",
                facebook:"",
            },
            phoneNumbers:['', ''],
            PhNumbers:[{number:''}],
            age:0,
            dob:new Date(),
        },
        // default value of mode:"onSubmit" and other available options are onBlur, onTouched, onChange
        mode:"all"

        //for setting a default value from api

        // defaultValues: async() =>{
        //     const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        //     const data = await response.json();
        //     return{
        //         username:"Batman",
        //         email:data.email,
        //         channel:''
        //     }
        // }
    });

    const {register, control, handleSubmit, formState, watch, getValues, setValue, reset, trigger} = form;

    const {errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount }= formState;

    console.log({isSubmitting, isSubmitted, isSubmitSuccessful,submitCount})

    // Helps to set the button state to disable
    console.log({touchedFields, dirtyFields, isDirty, isValid}); 

    const {fields, append, remove} = useFieldArray({
        name:'phNumbers',
        control
    });

    const onSubmit = (data) =>{
        console.log('form submitted', data);
        // it is recommended not to use reset() inside onSubmit instead do it inside useEffect as done below
        // reset();
    }

    const onError = (errors) =>{
        console.log('Form errors', errors)
    }

    // const watchUsername = watch('username');
    // const watchForm = watch();

    // useEffect(() => {
    //     const subscription = watch((value)=>{
    //         console.log(value);
    //     })
    
    //   return () => {
    //     subscription.unsubscribe();
    //   }
    // }, [watch])

    const handleGetValue = () => {
        // console.log('Get Values', getValues());
        console.log('Get Values', getValues(["username", "channel"]));
    }

    const handleSetValue = () => {
        setValue("username", "", {
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true,
        });
    }

    // recommend way to reset form value instead of putting it inside onSubmit

    useEffect(() => {
      if(isSubmitSuccessful){
        reset();
      }
    }, [isSubmitSuccessful, reset])
    

  return (
    <div>
        {/* <h3>{JSON.stringify(watchForm)}</h3> */}
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <div className='form-control'>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' {...register('username', {
                    required:{
                        value:true,
                        message:'Username is required',}
                    }
                    )} />
                <p className='error'>{errors?.username?.message}</p>
            </div>
            <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
                // Async validation for email
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "Email already exists";
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
            <div className='form-control'>
                <label htmlFor="channel">Channel</label>
                <input type="text" id='channel' {...register('channel',{
                    required:{
                        value:true,
                        message:'Channel is required'
                    }
                })} />
                <p className='error'>{errors?.channel?.message}</p>
            </div>
            <div className='form-control'>
                <label htmlFor="twitter">Twitter</label>
                <input type="text" id='twitter' {...register('social.twitter',{
                    // disabled:true,
                    disabled:watch("channel") === '',
                    required:"Enter Twitter Profile"
                })} />
            </div>
            <div className='form-control'>
                <label htmlFor="facebook">Facebook</label>
                <input type="text" id='facebook' {...register('social.facebook')} />
            </div>
            <div className='form-control'>
                <label htmlFor="primary-phone">Primary phone number</label>
                <input type="text" id='primary-phone' {...register('phoneNumbers.0')} />
            </div>
            <div className='form-control'>
                <label htmlFor="secondary-phone">Secondary phone number</label>
                <input type="text" id='secondary-phone' {...register('phoneNumbers.1')} />
            </div>
            <div>
                <label>List of phone numbers</label>
                <div>
                    {fields.map((field, index)=>{
                        return(<div className='form-control' key={index}>
                        <input type="text" {...register(`PhNumbers.${index}.number`)} />

                        {index > 0 && (
                    <button type='button' onClick={()=>{remove(index)}}>Remove</button>
                        )}
                    </div>)
                    })}
                    <button type='button' onClick={()=>{append({number:''})}}>Add phone number</button>
                </div>
            </div>
            <div className='form-control'>
                <label htmlFor="age">Age</label>
                <input type="number" id='age' {...register('age',{
                    valueAsNumber:true, 
                    required:{
                        value:true,
                        message:'Age is required'
                    }
                })} />
                <p className='error'>{errors?.age?.message}</p>
            </div>
            <div className='form-control'>
                <label htmlFor="dob">D.O.B</label>
                <input type="date" id='dob' {...register('dob',{
                    valueAsDate:true,
                    required:{
                        value:true,
                        message:'D.O.B is required'
                    }
                })} />
                <p className='error'>{errors?.dob?.message}</p>
            </div>
            <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
            <button onClick={()=>reset()}>Reset</button>
            <button type='button' onClick={handleGetValue}>Get Values</button>
            <button type='button' onClick={handleSetValue}>Set Value</button>
            <button type='button' onClick={()=>trigger()}>Trigger Value</button>
        </form>
        <DevTool control={control} />
    </div>
  )
}

export default ReactHookForm;