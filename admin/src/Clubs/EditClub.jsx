import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/EditForm";
import { useData } from "../DataProvider";
import StatusNotification from "../components/StatusNotification";

function EditClub() {
    const { id } = useParams();  
    const { club, fetchClub, isLoading, success } = useData();

    useEffect(() => {
        fetchClub(id);
    }, [id]);

    return (
        <section className="edit-section">
            <div className="edit-form-container">
                <header>
                    <div className="wrapper">
                        <figure className="player-icon">
                            {isLoading || !club ? (
                                <p>Loading...</p>
                            ) : (
                                <img src={`http://localhost:5000${club.image}`} alt="" />
                            )}
                        </figure>
                        <div>
                            <h1>Edit Club</h1>
                            {isLoading || !club ? (
                                <p>Loading...</p>
                            ) : (
                                <span className="name">{club.name}</span>
                            )}
                        </div>
                    </div>
                </header>
                <EditForm model="clubs" objectToEdit={club} />
                {success && (
                    <StatusNotification type="Club" object={club} action="updated" visible={true} duration={3000}/>
                )}
            </div>
        </section>
    );
}

export default EditClub;