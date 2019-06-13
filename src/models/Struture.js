class Struture {


    constructor(date, denomination_structure, organisme_gestionnaire, categorie, sous_categorie, adresse, cp, ville, téléphone, fax, contact_mail, site_internet, statut_structure,
                activites, age, nécessite_une_notification_MDPH, demande_effectue_patient_entourage, document_medical_a_remplir_par_medecin, latitude, longitude) {
        this.date = date;
        this.denomination_structure = denomination_structure;
        this.organisme_gestionnaire = organisme_gestionnaire;
        this.categorie = categorie;
        this.sous_categorie = sous_categorie;
        this.adresse = adresse;
        this.cp = cp;
        this.ville = ville;
        this.téléphone = téléphone;
        this.fax = fax;
        this.contact_mail = contact_mail;
        this.site_internet = site_internet;
        this.statut_structure = statut_structure;
        this.activites = activites;
        this.age = age;
        this.nécessite_une_notification_MDPH = nécessite_une_notification_MDPH;
        this.demande_effectue_patient_entourage = demande_effectue_patient_entourage;
        this.document_medical_a_remplir_par_medecin = document_medical_a_remplir_par_medecin;
        this.latitude = latitude;
        this.longitude = longitude;


    }


}

export default Struture;