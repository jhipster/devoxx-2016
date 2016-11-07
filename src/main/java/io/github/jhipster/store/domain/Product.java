package io.github.jhipster.store.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.github.jhipster.store.domain.enumeration.Size;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "price", precision=10, scale=2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "size")
    private Size size;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "product_subcategory",
               joinColumns = @JoinColumn(name="products_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="subcategories_id", referencedColumnName="ID"))
    private Set<SubCategory> subcategories = new HashSet<>();

    @ManyToOne
    private Brand brand;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public Product image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Product imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Product price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Size getSize() {
        return size;
    }

    public Product size(Size size) {
        this.size = size;
        return this;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public Set<SubCategory> getSubcategories() {
        return subcategories;
    }

    public Product subcategories(Set<SubCategory> subCategories) {
        this.subcategories = subCategories;
        return this;
    }

    public Product addSubcategory(SubCategory subCategory) {
        subcategories.add(subCategory);
        subCategory.getProducts().add(this);
        return this;
    }

    public Product removeSubcategory(SubCategory subCategory) {
        subcategories.remove(subCategory);
        subCategory.getProducts().remove(this);
        return this;
    }

    public void setSubcategories(Set<SubCategory> subCategories) {
        this.subcategories = subCategories;
    }

    public Brand getBrand() {
        return brand;
    }

    public Product brand(Brand brand) {
        this.brand = brand;
        return this;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Product product = (Product) o;
        if(product.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", description='" + description + "'" +
            ", image='" + image + "'" +
            ", imageContentType='" + imageContentType + "'" +
            ", price='" + price + "'" +
            ", size='" + size + "'" +
            '}';
    }
}
