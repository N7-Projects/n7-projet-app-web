package hagimetaceinture.server;

public class Date {

    private int jour;
    private int mois;
    private int annee;
    private int heure;
    private int minute;
    private int seconde;
    
    public Date(int jour, int mois, int annee, int heure, int minute, int seconde) {
        this.jour = jour;
        this.mois = mois;
        this.annee = annee;
        this.heure = heure;
        this.minute = minute;
        this.seconde = seconde;
    }

    public int getAnnee() {
        return annee;
    }
    
    public void setAnnee(int annee) {
        this.annee = annee;
    }
    
    public int getJour() {
        return jour;
    }
    
    public void setJour(int jour) {
        this.jour = jour;
    }
    
    public int getMois() {
        return mois;
    }
    
    public void setMois(int mois) {
        this.mois = mois;
    }
    
    public int getHeure() {
        return heure;
    }
    
    public void setHeure(int heure) {
        this.heure = heure;
    }
    
    public int getMinute() {
        return minute;
    }
    
    public void setMinute(int minute) {
        this.minute = minute;
    }
    
    public int getSeconde() {
        return seconde;
    }
    
    public void setSeconde(int seconde) {
        this.seconde = seconde;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + jour;
        result = prime * result + mois;
        result = prime * result + annee;
        result = prime * result + heure;
        result = prime * result + minute;
        result = prime * result + seconde;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Date other = (Date) obj;
        if (jour != other.jour)
            return false;
        if (mois != other.mois)
            return false;
        if (annee != other.annee)
            return false;
        if (heure != other.heure)
            return false;
        if (minute != other.minute)
            return false;
        if (seconde != other.seconde)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Date [jour=" + jour + ", mois=" + mois + ", annee=" + annee + ", heure=" + heure + ", minute=" + minute
                + ", seconde=" + seconde + "]";
    }
    
}
