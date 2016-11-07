package io.github.jhipster.store.service;

import io.github.jhipster.store.domain.Wish;
import io.github.jhipster.store.repository.WishRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Wish.
 */
@Service
@Transactional
public class WishService {

    private final Logger log = LoggerFactory.getLogger(WishService.class);
    
    @Inject
    private WishRepository wishRepository;

    /**
     * Save a wish.
     *
     * @param wish the entity to save
     * @return the persisted entity
     */
    public Wish save(Wish wish) {
        log.debug("Request to save Wish : {}", wish);
        Wish result = wishRepository.save(wish);
        return result;
    }

    /**
     *  Get all the wishes.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<Wish> findAll(Pageable pageable) {
        log.debug("Request to get all Wishes");
        Page<Wish> result = wishRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one wish by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Wish findOne(Long id) {
        log.debug("Request to get Wish : {}", id);
        Wish wish = wishRepository.findOne(id);
        return wish;
    }

    /**
     *  Delete the  wish by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Wish : {}", id);
        wishRepository.delete(id);
    }
}
