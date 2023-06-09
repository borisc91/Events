import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error:any= useRouteError();

    let title = 'An error occured';
    let message = 'Something is wrong!'

    if(error.status === 500) {
        message = error.data.message
    }

    if(error.status === 404) {
        title = "Not found!"
        message = "Could not find resource"
    }
    
  return (
    <>
    <MainNavigation />
    <PageContent title={title}>
        <p>{message}</p>
        </PageContent>
        </>
  )
}

export default Error