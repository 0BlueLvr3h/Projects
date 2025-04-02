package ia.prova.tomodachi.entities;

import java.util.Date;
import java.util.Map;

public class Avatar {
    private String name;
    private String surname;
    private String nickname;
    private Date dateOfBirth;
    private String favouriteColor;
    private Personality personality;
    private Voice voice;
    private float height;
    private int hunger = 0;
    private int socialNeed = 0;
    private int energy = 100;
    private Map<Avatar, Integer> relationShips;

    public Avatar(String name, String surname, String nickname, Date dateOfBirth, String favouriteColor, Personality personality, Voice voice, float height, int hunger, int socialNeed, int energy, Map<Avatar, Integer> relationShips) {
        this.name = name;
        this.surname = surname;
        this.nickname = nickname;
        this.dateOfBirth = dateOfBirth;
        this.favouriteColor = favouriteColor;
        this.personality = personality;
        this.voice = voice;
        this.height = height;
        this.hunger = hunger;
        this.socialNeed = socialNeed;
        this.energy = energy;
        this.relationShips = relationShips;
    }

    public void interactWith(Avatar other) {
        relationShips.put(other, relationShips.getOrDefault(other, 0) + 10);
        other.getRelationShips().put(this, other.getRelationShips().getOrDefault(this, 0) + 10);
        socialNeed -= 10;
        System.out.println(name + " interagisce con " + other.getName());
    }

    public void eat() {
        hunger -= 30;
        System.out.println(name + " ha mangiato!");
    }

    public void sleep() {
        energy += 30;
        System.out.println(name + " ha dormito!");
    }
    public void updateNeeds() {
        hunger += 5; // Fame aumenta col tempo
        energy -= 5; // Energia diminuisce
        socialNeed += 3; // Bisogno sociale aumenta
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getFavouriteColor() {
        return favouriteColor;
    }

    public void setFavouriteColor(String favouriteColor) {
        this.favouriteColor = favouriteColor;
    }

    public Personality getPersonality() {
        return personality;
    }

    public void setPersonality(Personality personality) {
        this.personality = personality;
    }

    public Voice getVoice() {
        return voice;
    }

    public void setVoice(Voice voice) {
        this.voice = voice;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public int getHunger() {
        return hunger;
    }

    public void setHunger(int hunger) {
        this.hunger = hunger;
    }

    public int getSocialNeed() {
        return socialNeed;
    }

    public void setSocialNeed(int socialNeed) {
        this.socialNeed = socialNeed;
    }

    public int getEnergy() {
        return energy;
    }

    public void setEnergy(int energy) {
        this.energy = energy;
    }

    public Map<Avatar, Integer> getRelationShips() {
        return relationShips;
    }

    public void setRelationShips(Map<Avatar, Integer> relationShips) {
        this.relationShips = relationShips;
    }
}
