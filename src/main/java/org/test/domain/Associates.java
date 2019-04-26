package org.test.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Entity entity.
 * @author A true hipster
 */
@ApiModel(description = "The Entity entity. @author A true hipster")
@Document(collection = "associates")
public class Associates implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    /**
     * fieldName
     */
    @ApiModelProperty(value = "fieldName")
    @Field("associate")
    private String associate;

    @DBRef
    @Field("bskills")
    private Set<Skills> bskills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAssociate() {
        return associate;
    }

    public Associates associate(String associate) {
        this.associate = associate;
        return this;
    }

    public void setAssociate(String associate) {
        this.associate = associate;
    }

    public Set<Skills> getBskills() {
        return bskills;
    }

    public Associates bskills(Set<Skills> skills) {
        this.bskills = skills;
        return this;
    }

    public Associates addBskills(Skills skills) {
        this.bskills.add(skills);
        skills.getAskills().add(this);
        return this;
    }

    public Associates removeBskills(Skills skills) {
        this.bskills.remove(skills);
        skills.getAskills().remove(this);
        return this;
    }

    public void setBskills(Set<Skills> skills) {
        this.bskills = skills;
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
        Associates associates = (Associates) o;
        if (associates.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), associates.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Associates{" +
            "id=" + getId() +
            ", associate='" + getAssociate() + "'" +
            "}";
    }
}
