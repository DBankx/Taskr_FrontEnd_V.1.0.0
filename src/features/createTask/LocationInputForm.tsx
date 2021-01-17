import { observer } from "mobx-react-lite";
import React from "react";
// import {LocationIcon} from "../../infrastructure/icons/Icons";
// import rootStoreContext from "../../application/stores/rootstore";

const LocationInputForm = () => {
   //  const {findLocation, locationSearchResults, loadingLocation} = useContext(rootStoreContext).appStore;
   // const [address, setAddress] = useState("");
   // useEffect(() => {
   //     if(address.length > 0) {
   //         findLocation(address);
   //     }
   // }, [address, findLocation])
   //  return (
   //      <div className="form__field">
   //          <label data-testid="label" className="text__darker" id="message-Your Message" htmlFor="location">Postal code or street address</label>
   //          <InputGroup>
   //              <InputLeftElement
   //                  pointerEvents="none"
   //                  className="form__input__icon"
   //              >
   //                  <LocationIcon boxSize={7} color="#3D3373" />
   //              </InputLeftElement>
   //       <Input value={address} onChange={e => setAddress(e.target.value)} className="form__input form__input_w_icon" placeholder="Search for a location by address or postCode" />
   //              {loadingLocation && (
   //                  <InputRightElement width="4.5em" height="100%" pointerEvents="none">
   //                      <Spinner />
   //                  </InputRightElement>
   //              )}
   //      </InputGroup>
   //
   //          {locationSearchResults && address.length > 0 !== null && <div className="suggestion_wrapper">
   //              {locationSearchResults.features.length}
   //          </div>}
   //         
   //      </div>
   //  )
    return (
        <div>
            hey
        </div>
    )
}

export default observer(LocationInputForm);