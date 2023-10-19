import classNames from "classnames";
import { useEffect, useState } from "react";

const initialErrors = {
  postcode: '',
  suburb: '',
  state: '',
};

export default function Home() {
  const [formData, setFormData] = useState({
    postcode: '',
    suburb: '',
    state: '',
  });

  const [errors, setErrors] = useState({ ...initialErrors });

  useEffect(() => {
    // Reset errors when the user types in the corresponding field
    setErrors((prevErrors) => ({
      ...prevErrors,
      postcode: '',
      suburb: '',
      state: '',
    }));
  }, [formData.postcode, formData.suburb, formData.state]);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...initialErrors };

    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
      isValid = false;
    }

    if (!formData.suburb.trim()) {
      newErrors.suburb = 'Suburb is required';
      isValid = false;
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (validateForm()) {
      // Form is valid, proceed with address verification
      // Add your address verification logic here
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };



  return (
    <main
      className='flex flex-col items-center justify-between gap-y-8 p-8 md:p-24'
    >
      <img src="https://images.lawpath.com.au/2022/09/lawpath-logo.svg" alt="Lawpath logo" className="h-auto w-[180px]" />
      <h1 className="text-[42px] text-center font-semibold text-blue">Australia Address Validation</h1>
      <form className="flex flex-col w-[100%] sm:w-[480px] lg:w-[640px]" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the Postcode"
          value={formData.postcode}
          onChange={(event) => handleChange('postcode', event.target.value)}
          className={classNames('border-2 border-blue rounded-md p-2 text-center', errors.postcode && 'border-red-700')}
        />
        <p className="text-red-700">{errors.postcode}</p>

        <input
          type="text"
          placeholder="Enter the Suburb"
          value={formData.suburb}
          onChange={(event) => handleChange('suburb', event.target.value)}
          className={classNames('border-2 border-blue rounded-md p-2 text-center mt-6', errors.suburb && 'border-red-700')}
        />
        <p className="text-red-700">{errors.suburb}</p>

        <input
          type="text"
          placeholder="Enter the State"
          value={formData.state}
          onChange={(event) => handleChange('state', event.target.value)}
          className={classNames('border-2 border-blue rounded-md p-2 text-center mt-6', errors.state && 'border-red-700')}
        />
        <p className="text-red-700">{errors.state}</p>

        <button type="submit" className="bg-blue-light hover:bg-blue text-white w-fit rounded-md px-6 py-4 mx-auto hover:bg-blue-700 mt-6">
          Verify Address
        </button>
      </form>
    </main>
  )
}
