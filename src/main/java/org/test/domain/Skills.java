package org.test.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Skills.
 */
@Document(collection = "skills")
public class Skills implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("skills")
    private String skills;

    @DBRef
    @Field("askills")
    @JsonIgnore
    private Set<Associates> askills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSkills() {
        return skills;
    }

    public Skills skills(String skills) {
        this.skills = skills;
        return this;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public Set<Associates> getAskills() {
        return askills;
    }

    public Skills askills(Set<Associates> associates) {
        this.askills = associates;
        return this;
    }

    public Skills addAskills(Associates associates) {
        this.askills.add(associates);
        associates.getBskills().add(this);
        return this;
    }

    public Skills removeAskills(Associates associates) {
        this.askills.remove(associates);
        associates.getBskills().remove(this);
        return this;
    }

    public void setAskills(Set<Associates> associates) {
        this.askills = associates;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Skills skills = (Skills) o;
        if (skills.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), skills.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Skills{" +
            "id=" + getId() +
            ", skills='" + getSkills() + "'" +
            "}";
    }
}
