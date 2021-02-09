import Swal from 'sweetalert2';

class SwalCustomized{
    processError  = (err: any) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
        })
    }
}

export default new SwalCustomized();