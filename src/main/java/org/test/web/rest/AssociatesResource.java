package org.test.web.rest;
import org.test.domain.Associates;
import org.test.repository.AssociatesRepository;
import org.test.web.rest.errors.BadRequestAlertException;
import org.test.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Associates.
 */
@RestController
@RequestMapping("/api")
public class AssociatesResource {

    private final Logger log = LoggerFactory.getLogger(AssociatesResource.class);

    private static final String ENTITY_NAME = "associates";

    private final AssociatesRepository associatesRepository;

    public AssociatesResource(AssociatesRepository associatesRepository) {
        this.associatesRepository = associatesRepository;
    }

    /**
     * POST  /associates : Create a new associates.
     *
     * @param associates the associates to create
     * @return the ResponseEntity with status 201 (Created) and with body the new associates, or with status 400 (Bad Request) if the associates has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/associates")
    public ResponseEntity<Associates> createAssociates(@RequestBody Associates associates) throws URISyntaxException {
        log.debug("REST request to save Associates : {}", associates);
        if (associates.getId() != null) {
            throw new BadRequestAlertException("A new associates cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Associates result = associatesRepository.save(associates);
        return ResponseEntity.created(new URI("/api/associates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /associates : Updates an existing associates.
     *
     * @param associates the associates to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated associates,
     * or with status 400 (Bad Request) if the associates is not valid,
     * or with status 500 (Internal Server Error) if the associates couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/associates")
    public ResponseEntity<Associates> updateAssociates(@RequestBody Associates associates) throws URISyntaxException {
        log.debug("REST request to update Associates : {}", associates);
        if (associates.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Associates result = associatesRepository.save(associates);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, associates.getId().toString()))
            .body(result);
    }

    /**
     * GET  /associates : get all the associates.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of associates in body
     */
    @GetMapping("/associates")
    public List<Associates> getAllAssociates(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Associates");
        return associatesRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /associates/:id : get the "id" associates.
     *
     * @param id the id of the associates to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the associates, or with status 404 (Not Found)
     */
    @GetMapping("/associates/{id}")
    public ResponseEntity<Associates> getAssociates(@PathVariable String id) {
        log.debug("REST request to get Associates : {}", id);
        Optional<Associates> associates = associatesRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(associates);
    }

    /**
     * DELETE  /associates/:id : delete the "id" associates.
     *
     * @param id the id of the associates to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/associates/{id}")
    public ResponseEntity<Void> deleteAssociates(@PathVariable String id) {
        log.debug("REST request to delete Associates : {}", id);
        associatesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
