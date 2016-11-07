package io.github.jhipster.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SubCategory.
 */
@Entity
@Table(name = "sub_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SubCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "alcohol")
    private Boolean alcohol;

    @ManyToOne
    private Category category;

    @ManyToMany(mappedBy = "subcategories")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SubCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isAlcohol() {
        return alcohol;
    }

    public SubCategory alcohol(Boolean alcohol) {
        this.alcohol = alcohol;
        return this;
    }

    public void setAlcohol(Boolean alcohol) {
        this.alcohol = alcohol;
    }

    public Category getCategory() {
        return category;
    }

    public SubCategory category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public SubCategory products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public SubCategory addProduct(Product product) {
        products.add(product);
        product.getSubcategories().add(this);
        return this;
    }

    public SubCategory removeProduct(Product product) {
        products.remove(product);
        product.getSubcategories().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SubCategory subCategory = (SubCategory) o;
        if(subCategory.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, subCategory.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SubCategory{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", alcohol='" + alcohol + "'" +
            '}';
    }
}
