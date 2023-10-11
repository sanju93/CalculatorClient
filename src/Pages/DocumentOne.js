import {useParams} from 'react-router-dom';




function DocumentOne(){

  let params = useParams();
  return <>
    {params}
    </>
}

export default DocumentOne;