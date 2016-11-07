package io.github.jhipster.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Brand.
 */
@Entity
@Table(name = "brand")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Brand implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "brand_name", nullable = false)
    private String brandName;

    @OneToMany(mappedBy = "brand")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrandName() {
        return brandName;
    }

    public Brand brandName(String brandName) {
        this.brandName = brandName;
        return this;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Brand products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Brand addProduct(Product product) {
        products.add(product);
        product.setBrand(this);
        return this;
    }

    public Brand removeProduct(Product product) {
        products.remove(product);
        product.setBrand(null);
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
        Brand brand = (Brand) o;
        if(brand.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, brand.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Brand{" +
            "id=" + id +
            ", brandName='" + brandName + "'" +
            '}';
    }
}
